const base = {
	src: '.temp/',
	dest: 'dist/'
}

module.exports = {
	base: base,
	directives : {
		src : base.src + "src/directives/**",
		dest : base.dest + "directives/"
	},
	modules : {
		src : base.src + "src/modules/**",
		dest : base.dest + "modules/"
	},
	vendor : {
		src : base.src + "assets/bower_components/**",
		dest : base.dest + "vendor/"
	},
	assets : {
		src : base.src + "assets/bower_components/**",
		dest : base.dest + "assets/"
	},
	fonts : {
		src : base.src + "assets/bower_components/**",
		dest : base.dest + "fonts/"
	},
	imgs : {
		src : base.src + "assets/images/**",
		dest : base.dest + "assets/images/"
	}
}