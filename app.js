/*global Ext */
Ext.application({
    launch: function() {
        
        Ext.define("Activity", {
            extend: "Ext.data.Model",
            fields: [
                {name: 'id', type: 'int'},                        
                {name: 'date', type: 'date'},    
                {name: 'type', type: 'string'},    
                {name: 'distance', type: 'string'},    
                {name: 'minutes', type: 'int'},  
                {name: 'comments', type: 'string'}
            ]
        });
        
        var store = Ext.create('Ext.data.Store', {
            storeId: "activityStore",
            model: "Activity",
            proxy: {
                type: 'ajax',
                url: 'exercise.json'
            },
            autoLoad: true
        }); 
                        
       var view = Ext.create("Ext.NavigationView", {
            fullscreen: true,
            items: [
                {
                    xtype: 'list',
                    title: 'Activities',
                    //itemTpl: '{date} - {type}',
                    itemTpl: '{date:date("m/d/Y")} - {type}',
                    store: store
                }
            ]
        });
        
        var addNewRow = function() {
            // future versions should display a form for adding a record
            var fakeRecord = Ext.create('Activity', {
                date: new Date(), 
                type: 'Walk', 
                distance: '2 miles', 
                minutes: 28, 
                comments: 'Auto generated record.'
            });
        
            store.add(fakeRecord);
        };
                
        view.getNavigationBar().add({
            xtype: 'button',
            text: 'Add',
            align: 'right',
            handler: addNewRow
        });
        
    }
});