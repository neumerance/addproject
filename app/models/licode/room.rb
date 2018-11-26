module Licode
  class Room
    attr_accessor :service_id, :service_key, :nuve_host
    def initialize
      @service_id = Figaro.env.service_id
      @service_key = Figaro.env.service_key
      @nuve_host = Figaro.env.nuve_host
    end

    def show(room_id = '')
      request('show', default_args.merge(room_id: room_id))
    end

    def list
      request('list', default_args)
    end    

    def create(args = {})
      request('create', default_args.merge(params: args))
    end

    def destroy(room_id = '')
      request('destroy', default_args.merge(room_id: room_id))
    end

    def create_token(room_id = '')
      request('create_token', default_args.merge(room_id: room_id))
    end

    def get_users(room_id = '')
      request('get_users', default_args.merge(room_id: room_id))
    end

    private

    def request(action, args = {})
      t = NodeTask.new(Rails.root.join("app/javascript/packs/licode_api/rooms/#{action}").to_s)
      t.run(args)
    end

    def default_args
      { service_id: service_id, service_key: service_key, nuve_host: nuve_host }
    end
  end
end