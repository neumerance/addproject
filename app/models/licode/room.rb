module Licode
  class Room
    attr_accessor :service_id, :service_key, :nuve_host
    def initialize
      @service_id = Figaro.env.service_id
      @service_key = Figaro.env.service_key
      @nuve_host = Figaro.env.nuve_host
    end

    def list
      t = NodeTask.new(Rails.root.join('app/javascript/packs/licode_api/rooms/list').to_s)
      t.run(service_id: service_id, service_key: service_key, nuve_host: nuve_host)
    end    

    def create(args = {})
      t = NodeTask.new(Rails.root.join('app/javascript/packs/licode_api/rooms/create').to_s)
      t.run(service_id: service_id, service_key: service_key, nuve_host: nuve_host, params: args)
    end
  end
end