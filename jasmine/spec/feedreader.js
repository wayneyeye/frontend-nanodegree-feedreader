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

         it('should have at least one single entry element',function(done){
            container=$('.feed .entry');
            expect(container.length>0).toBe(true);
            done();
         });

    });
    describe('New Feed Selection', function() {
        var originalHTML=[],newHTML=[];
        beforeEach(function(done){
            //error handling for out of bound array access
            if (allFeeds.length<2) throw "only one feed to use!";
            //init a feed
            loadFeed(0,function(){ 
                $('.feed .entry').each(function(){
                    originalHTML.push($(this).html());//saving elements into an array
                });
                // chaining second loadFeed
                loadFeed(1,function(){
                    $('.feed .entry').each(function(){
                        newHTML.push($(this).html());
                    });//second loadFeed method
                    done();
                });
            });   
         });
        //comparing the entries
        it('should change the content',function(done){
            console.log(originalHTML.length);
            for (var i=0;i<Math.min(originalHTML.length,newHTML.length);i++){
                expect(newHTML[i]).not.toEqual(originalHTML[i]);//compare old and new                    
            }
            done();
        });         
    });
}());
