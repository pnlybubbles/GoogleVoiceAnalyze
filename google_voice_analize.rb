require_relative "./libs/accessor.rb"

accessor = Accessor::Socket.new

accessor.script do
  event("open") {
    puts "opened"
  }
  event("load") {
    call_function("start_speech_recognition")
  }
  event("result") { |str|
    puts str.strip
  }
  event("close") {
    puts "closed"
  }
end

accessor.start
