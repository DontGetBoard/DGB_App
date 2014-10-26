module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		jshint: {
			all: ['dev/js/**/*.js', '!dev/js/jquery.js', '!dev/js/angular.js']
		},
	  	concat: {
	    	dist: {
	      		src: ['dev/js/jquery.js', 'dev/js/angular.js', 'dev/js/app.js', 'dev/js/controller/*.js'],
	      		dest: 'www/js/min.js',
	    	},
	  	},
	  	uglify: {
	    	dist: {
	      		files: {
	        		'www/js/min.js': ['www/js/min.js']
	      		},
	      		mangle: false
	    	}
	  	},
	  	cssmin: {
		  	combine: {
		   		files: {
		      		'www/css/output.css': ['dev/css/style.css', 'dev/css/bootstrap.css']
		    	}
		  	},
			minify: {
			    expand: true,
			    cwd: 'dev/css/',
			    src: ['output.css'],
			    dest: 'www/css/',
			    ext: '.min.css'
			}
		},
		imagemin: {                          		// Task
		    dynamic: {                         		// Another target
			    files: [{
			        expand: true,                  	// Enable dynamic expansion
			        cwd: 'dev/css/img/',                   	// Src matches are relative to this path
			        src: ['**/*.{png,jpg,gif}'],   	// Actual patterns to match
			        dest: 'www/css/img/'         // Destination path prefix
			    }]
		    }
		},
		copy: {
		  	main: {
		  		expand: true,
			    cwd: 'dev/',
			    src: 'index.html',
			    dest: 'www/'
		  	},
		  	partials: {
		  		expand: true,
			    cwd: 'dev/partials/',
			    src: '**',
			    dest: 'www/partials/'
		  	},
		  	fonts: {
		  		expand: true,
			    cwd: 'dev/fonts/',
			    src: '**',
			    dest: 'www/fonts/'
		  	},
		},
		replace: {
		  another_example: {
		    src: ['www/*.html','www/css/output.min.css','www/js/min.js'],
		    overwrite: true,                 // overwrite matched source files
		    replacements: [{
		      from: "img/",
		      to: "imgmin/"
		    }]
		  }
		},
		favicons: {
		    options: {
		    	windowsTile: true,
			    tileBlackWhite: false,
			    tileColor: "auto",
		    	html: 'deploy/index.html',
		    	HTMLPrefix: "/imgmin/icons/"
		    },
		    icons: {
		      	src: 'img/fbog.png',
		      	dest: 'deploy/imgmin/icons'
		    }
		},
		htmlmin: {                                     			// Task
		    dist: {                                      		// Target
		      	options: {                                 		// Target options
		        	removeComments: true,
		        	collapseWhitespace: true
		      	},
		      	files: {                                   		// Dictionary of files
		        	'deploy/index.html': 'deploy/index.html',   // 'destination': 'source'
		      	}
		    }
		},
		'http-server': {

	        'dev': {

	            // the server root directory
	            root: "",

	            port: 8282,
	            // port: function() { return 8282; }

	            host: "127.0.0.1",

	            cache: "cache",
	            showDir : true,
	            autoIndex: true,
	            defaultExt: "html",

	            // run in parallel with other tasks
	            runInBackground: false

	        }

	    }
	});

	grunt.registerTask('deploy',['jshint', 'concat', 'cssmin', 'imagemin', 'copy']);

}