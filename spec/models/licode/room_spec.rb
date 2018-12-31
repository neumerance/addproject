require 'rails_helper'

RSpec.describe Licode::Room, type: :model do
  let!(:client) { described_class.new }

  it 'should get a list of rooms' do
    expect(client.list[:rooms].is_a? Array).to be_truthy
  end

  context 'room creation' do
    let!(:room_name) { Faker::FunnyName.name }
    let!(:description) { Faker::Lorem.sentence }

    it 'should create' do
      client.create({ room_name: room_name, description: description })
      expect(client.list[:rooms].map{ |x| x[:name] }.include? room_name).to be_truthy
    end
  end

  context 'token creation' do
    let!(:room) { client.list[:rooms].first }
    let!(:resp) { 
      client.create_token({
        room_id: room[:_id],
        name: Faker::FunnyName.name,
        role: 'presenter'
      })
    }

    it 'should create a token' do
      expect(resp[:token].present?).to be_truthy
    end
  end

  context 'room user listing' do
    let!(:room) { client.list[:rooms].last }
    let!(:resp) { client.get_users(room[:_id]) }

    it 'should be able to get user list reponse' do
      expect(resp[:users].is_a? Array).to be_truthy
    end
  end

  context 'deletion' do
    let!(:rooms) { client.list[:rooms] }

    before do
      rooms.each do |room|
        client.destroy(room[:_id])
      end
    end

    it 'should destroy all rooms' do
      expect(client.list[:rooms].any?).to be_falsey
    end
  end
end
