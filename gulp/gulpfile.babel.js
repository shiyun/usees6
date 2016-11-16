'use strict';
import gulp from 'gulp';
import cache from 'gulp-cache';
import wrench from 'wrench';
import watch from 'gulp-watch';

wrench.readdirSyncRecursive('./gulp').filter(file => {
	return (/\.js$/i).test(file);
}).map(file => {
	require('./gulp/'+file);
});

gulp.task('test', ()=>{
	//gulp.start(['test1']);
});

gulp.task('fabaocn', ()=>{
	gulp.start(['fabao_libs', 'fabao_less', 'fabao_images', 'fabao_comps', 'fabao_watch']);
});

gulp.task('cleanCash', function (done) {  
    return cache.clearAll(done);  
}); 

// 默认任务
gulp.task('default', function(){
	gulp.run('clean', 'libs', 'util', 'less', 'comps', 'live', 'images');
	gulp.watch('../src/less/*.*', ['less']);
	gulp.watch('../src/images/**/*.*', ['images']);
	gulp.watch('../src/comp/**/main.js', ['comps']);
	gulp.watch('../src/util/*.*', ['util']);
});