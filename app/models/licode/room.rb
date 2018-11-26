module Licode
  class Room
    attr_accessor :service_id, :service_key, :nuve_host
    def initialize
      @service_id = Figaro.env.service_id
      @service_key = Figaro.env.service_key
      @nuve_host = Figaro.env.nuve_host
    end

    def list(args = {})
      fork do
        exec(
          'node', Rails.root.join('app/javascript/packs/licode_api/rooms/list.js').to_s, 
          service_id, service_key, nuve_host
        )
      end
    end    

    def create(args = {})
      fork do 
        exec(
          'node', Rails.root.join('app/javascript/packs/licode_api/rooms/create.js').to_s, 
          service_id, service_key, nuve_host,
          args[:name], args[:description] || '', args[:p2p] || false
        ) 
      end
    end
  end
end