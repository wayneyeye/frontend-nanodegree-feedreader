/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('are not empty urls', function(){
            for (var i=0; i<allFeeds.length;i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        it('are not empty names', function(){
            for (var i=0; i<allFeeds.length;i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


    describe('The menu', function() {
        it('is hidden by default',function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

        it('is hidden/display by clicking',function(){
            menuIcon = $('.menu-icon-link');
                menuIcon.click(); //triger it by click()
                expect($('body').hasClass('menu-hidden')).not.toBe(true);
            //Two separate tests 
                menuIcon.click();
                expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });


    describe('Initial Entries', function() {
         var container;

         beforeEach(function(done){
            loadFeed(0,done);
         });

         it('should have at least one single entry element',function(){
            container=$('.feed .entry');
            expect(container.length>0).toBe(true);
         });

    });
    describe('New Feed Selection', function() {
        var container = $('.feed'),
            originalHTML,newHTML;
         beforeEach(function(done){
            if (allFeeds.length<2) throw "only one feed to use!";//error handling for out of bound array access
            loadFeed(0,function(){ //init a feed
                done();
            });
            originalHTML=container.children()[0];
            loadFeed(1,function(){ //change a feed
                done();
            });
         });

         it('should change the content',function(done){
            newHTML=container.children()[0];
            expect(newHTML).not.toBe(originalHTML);//compare old and new
            done();
        });         
    });
}());
