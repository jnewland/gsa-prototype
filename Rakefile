require 'rake'

desc 'Default: run specs.'
task :default => :spec

task :spec do
  files = FileList['spec/*.html']
  
  files.each do |file|
    if file =~ /\/([^\/]+)\.js$/
      file = "spec/#{$1}.html"
    end
    unless File.exists?(file)
      puts "Notice: Test file does not exist: #{file}"
      next
    end
    `open #{file} -a Safari.app -g`
  end
end

#TODO create 'build' task to glue separate JS files into one for distribution
#TODO create a task to build with builder.js prepended
#TODO create a task to build with prototype.js and builder.js prepended
#TODO create a task to compress the JS file we build