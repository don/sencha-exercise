/*global Ext */
Ext.application({
    launch: function() {

        Ext.define("Activity", {
            extend: "Ext.data.Model",
            config: {
                fields: [
                    {name: 'id', type: 'int'},
                    {name: 'date', type: 'date'},
                    {name: 'type', type: 'string'},
                    {name: 'distance', type: 'string'},
                    {name: 'minutes', type: 'int'},
                    {name: 'comments', type: 'string'}
                ]
            }
        });

        var store = Ext.create('Ext.data.Store', {
            storeId: "activityStore",
            model: "Activity",
            proxy: {
                type: 'ajax',
                url: 'exercise.json'
            },
            sorters: [
                {
                    property: 'date',
                    direction: 'DESC'
                }
            ],
            autoLoad: true
        });

        var template = Ext.XTemplate.from(Ext.get('detail-template'));

        var onNavigationPush = function(v, item) {
            v.down('#addButton').hide();
        };

        var onNavigationPop = function(v, item) {
            v.down('#addButton').show();
            v.down('#saveButton').hide();
        };

       var view = Ext.create("Ext.NavigationView", {
            fullscreen: true,
            items: [
                {
                    xtype: 'list',
                    title: 'Activities',
                    itemTpl: '{date:date("m/d/Y")} - {type}',
                    store: store,
                    onItemDisclosure: function (record, btn, index) {
                        view.push({
                            xtype: 'panel',
                            title: 'Activity',
                            html: template.apply(record.data),
                            styleHtmlContent: true
                        });
                    }
                }
            ],
            listeners: {
                push: onNavigationPush,
                pop: onNavigationPop
            }
        });

        var formBase = {
            title: "Activity",
            itemId: "form",
            items: [
                {
                    xtype: 'fieldset',
                    items: [
                        {
                            xtype: 'datepickerfield',
                            name: 'date',
                            label: 'Date',
                            value: new Date()
                        },
                        {
                            xtype: 'selectfield',
                            name: 'type',
                            label: 'Type',
                            options: [
                                { text: "" },
                                { text: "Run", value: "Run" },
                                { text: "Bike", value: "Bike" },
                                { text: "Swim", value: "Swim" },
                                { text: "Walk", value: "Walk" }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            name: 'distance',
                            label: 'Distance'
                        },
                        {
                            xtype: 'numberfield',
                            name: 'minutes',
                            label: 'Minutes'
                        },
                        {
                            xtype: 'textareafield',
                            name: 'comments',
                            label: 'Notes'
                        }                        
                    ]
                }
            ]
        };

        var addNewRow = function() {
            view.push(Ext.create('Ext.form.Panel', formBase));
            view.down('#saveButton').show();            
        };

        var save = function() {
            var form = view.down('#form');
            var record = Ext.create('Activity', form.getValues());
            store.add(record);
            // TODO validation and error handling
            view.pop();
        };

        view.getNavigationBar().add([
            {
                xtype: 'button',
                id: 'addButton',
                align: 'right',
                ui: 'action',                
                iconCls: 'compose',
                iconMask: true,
                handler: addNewRow
            },
            {
                xtype: 'button',
                id: 'saveButton',
                text: 'Save',
                align: 'right',
                ui: 'action',
                handler: save,
                hidden: true
            }
        ]);

    }
});