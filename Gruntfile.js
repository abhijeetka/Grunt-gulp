/*module.exports=function(grunt){
grunt.registerTask('greet','greet the user',function(){
console.log('Hello World!');
   });

};*/


//////////////////////////////////////////////////////////////////////////////

module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),


  //Task Configuration
/**********************************************Default*****************************************/

        clean: ["allcode","Reports"],
         

	mkdir:{
		all: {
     			 options: {
      				  mode: 0700,
       				  create: ['allcode','Reports']
     				 },
  		     },
        },


	copy: {
		main:{
			 files: [
				       	{
						expand: true,
						src: ['src/**'],
						dest: 'allcode/'
					},
			        ],
		   },
	
	},

/*	composer: {
        	options : {
			usePhp: true,
			cwd: '/home/ashwinkup/sourcecode/',
            		composerLocation: '/usr/local/bin/composer'
	        },
		install:{
			
		} 		
	
    },  */
	

	exec: {
		command: '/usr/local/bin/composer -v'
	},

 /*************************************************PHP-CI*****************************************/
 	phpmd: {
                application: {
                        dir: 'allcode'
         	             },
	        options: {
        	        // rulesets: 'codesize'
			 reportFile: 'Reports/phpmd'
                	 }
          },


	phpcpd: {
 		 application: {
     			 dir: 'allcode'
   		              },
    		  options:{
		       //quiet: true
			 reportFile: 'Reports/phpcpd'
    		 }
            },


	phpcs: {
                application: {
                         src: ['allcode/src/php/*.php', 'allcode/src/config/*.php']
               },

		options:{
			reportFile: 'Reports/phpcs'
			}

	},

	phploc: {
		 application:{
			dir: 'allcode/src'
		},
		 options:{
                  //      reportFile: 'phploc'
			logCSV: 'Reports/phploc',
			progress: true
                        }

         },


	pdepend: {
	         dir: 'allcode',

		options: {
			summaryXml: 'Reports/summaryXml.xml',
			}
		},


	phpdocumentor: {
    	    dist: {
        	    options: {
               		 directory : '.',
	                 target : 'docs'
         	   }
       		 }
	    },


       phpunit: {
                   classes: {
                         dir: 'tests'
                            },
                /* options: {
                        bin: 'phpunit'
                        }*/
                 },



	compress: {
		  main: {
   			 options: {
     					 archive: 'allcode.zip'
   				 },
		   	 files: [
     				 {src: ['allcode/**'], dest: 'internal_folder2/'}, // includes files in path and its subdirs 
   			  	 ]
 			}
	           },

		
	sonarRunner: {
	 	       analysis: {
         	       options: {
                debug: true,
                separator: '\n',
                sonar: {
                    host: {
                        url: 'http://172.27.59.62:9080'
                    },
                    jdbc: {
                        url: 'jdbc:mysql://172.27.59.62:3306/sonar',
                        username: 'sonar',
                        password: 'sonar'
                    },
 
                    projectKey: 'sonar:grunt-sonar-runner:0.1.0',
                    projectName: 'Grunt Sonar Runner',
                    projectVersion: '0.10',
                    sources: 'src',
                  //  language: 'php','js',
                    sourceEncoding: 'UTF-8'
                }
            }
        }
    },

/*************************************************Build*****************************************************/
	jshint: {
   		 all: ['Gruntfile.js', 'allcode/**/*.js', 'tests/**/*.js'],
		options: {
                           reporterOutput: "Reports/jshint"
                        }

		  },


	csslint:{
		src:['stylesheet.css'],
		options: {
                           reporterOutput: "Reports/csslint"
			}
		},

	

	jscs: {
	    src: "allcode/**/*.js",
		options: {
		config: ".jscsrc",
		reporterOutput: "Reports/jscs"
			}
   	 
   	 },



	htmllint: {
  		  src: [
		      'sample.html'
		    ],
	    },


	bower: {
   		 install: {
		       //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory 
   		   options: {arguments: ['bootstrap','jquery','chartjs']}	
			 }
	  },

	
	wiredep: {
     		 task: {
       			 src: ['sample.html']
		      }
   	 },

	
	bower_concat: {
		  all: {
		    dest: 'bower_concat/_bower.js',
	  	    cssDest: 'bower_concat/_bower.css',
		 //   googleapiDest:'bower_concat/_index'
  		/*	  exclude: [
     				 'jquery',
				      'modernizr'
				    ],
			  dependencies: {
			      'underscore': 'jquery',
			      'backbone': 'underscore',
			      'jquery-mousewheel': 'jquery'
				    },  */
		 /*   bowerOptions: {
		        relative: false,
			options: { separator : ';\n' }
   			 }  */
		  },

	},


	minified : {
 		 files: {
   		    src: [
		    'bower_concat/**/*.js',
		    'bower_concat/**/*.css'
		    ],
		      dest: 'bower_concat/min'
		  },
		  options : {
		    sourcemap: true,
		    allinone: false
			  }
		}		

	

});


// These plugins provide necessary tasks.

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-mkdir');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-composer');
grunt.loadNpmTasks('grunt-phpmd');
grunt.loadNpmTasks('grunt-phpcpd');
grunt.loadNpmTasks('grunt-phpcs');
grunt.loadNpmTasks('grunt-pdepend');
grunt.loadNpmTasks('grunt-phploc');
grunt.loadNpmTasks('grunt-phpunit');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-sonar-runner');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks("grunt-jscs");
grunt.loadNpmTasks('grunt-bower');
grunt.loadNpmTasks('grunt-bower-task');
grunt.loadNpmTasks('grunt-bower-commands');
grunt.loadNpmTasks('grunt-bower-event');
grunt.loadNpmTasks('grunt-npm-install');    //installs npm module from grunt task
grunt.loadNpmTasks('grunt-wiredep');
grunt.loadNpmTasks('grunt-bower-concat');
grunt.loadNpmTasks('grunt-minified');
grunt.loadNpmTasks('grunt-phpdocumentor');
grunt.loadNpmTasks('grunt-htmllint');
grunt.loadNpmTasks('grunt-exec');

//Default Task
/*grunt.registerTask('default',['clean','mkdir','copy','phpmd','phpcpd','phploc','phpcs','phpunit','compress','pdepend','sonarRunner','jscs','jshint','csslint','bower','wiredep','bower_concat','minified']);  */


grunt.registerTask('default',['clean','mkdir','copy']);
grunt.registerTask('PHP-CI',['phpmd','phpcpd','phploc','phpcs','pdepend','phpdocumentor','phpunit','sonarRunner','compress']);
grunt.registerTask('Developement',['jscs','jshint','csslint','htmllint','npm-install:bower','bower','wiredep','bower_concat','minified']);

};


