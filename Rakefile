require 'rake'
require 'rake/packagetask'

desc 'Specs!'
task :test => :spec

GSA_ROOT     = File.expand_path(File.dirname(__FILE__))
GSA_SRC_DIR  = File.join(GSA_ROOT, 'src')
GSA_DIST_DIR = File.join(GSA_ROOT, 'dist')
GSA_PKG_DIR  = File.join(GSA_ROOT, 'pkg')
GSA_VERSION  = '0.2.0'

desc 'Build a combined JS file for distibution'
task :dist do
  $:.unshift File.join(GSA_ROOT, 'lib')
  require 'protodoc'
  
  Dir.chdir(GSA_SRC_DIR) do
    File.open(File.join(GSA_DIST_DIR, 'gsa-prototype.js'), 'w+') do |dist|
      dist << Protodoc::Preprocessor.new('gsa-prototype.js.erb')
    end
  end
end

Rake::PackageTask.new('gsa-prototype', GSA_VERSION) do |package|
  package.need_tar_gz = true
  package.package_dir = GSA_PKG_DIR
  package.package_files.include(
    '[A-Z]*',
    'dist/gsa-prototype.js',
    'lib/**',
    'src/**',
    'spec/**',
    'xsl/**'
  )
end

task :clean_package_source do
  rm_rf File.join(GSA_PKG_DIR, "gsa-prototype-#{VERSION}")
end

task :spec do
  files = ENV['STAKEOUT'] rescue 'spec/*.html'
  files = FileList[files]
  
  files.each do |file|
    if file =~ /\/([^\/]+)\.js$/
      file = "spec/#{$1}.html"
    end
    unless File.exists?(file)
      puts "Notice: Test file does not exist: #{file}"
      next
    end
    `open #{file} -a Safari -g`
  end
end

#TODO create a task to build with builder.js prepended
#TODO create a task to build with prototype.js and builder.js prepended
#TODO create a task to compress the JS file we build