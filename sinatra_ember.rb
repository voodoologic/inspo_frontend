require 'sinatra'
require 'haml'
require 'pry'

configure do
  set :port, 5055
  set :environment, :developtment
  set :root, File.realpath(File.dirname(__FILE__))
  set :public_folder, File.expand_path('dist')
end

get '*' do
  # pass if keys_absent?
  send_file 'dist/index.html'
end

get '*' do #hack way to prevent headers from loading ember
  haml :setup, format: :html5
end

