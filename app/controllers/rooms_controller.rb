class RoomsController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  before_action :respond_to_json

  def index
    render json: client.list
  rescue => _e
    render json: { errors: ['Unable to get room lists'] }
    Rails.logger.error "RoomsController#index: #{e.as_json}"
  end

  def show
    render json: client.show(params[:id])
  rescue => _e
    render json: { errors: ["Unable to get room for room ID #{params[:id]}"] }
    Rails.logger.error "RoomsController#show: #{e.as_json}"
  end

  def create
    render json: client.create(params[:room])
  rescue => _e
    render json: { errors: ['Unable to create room'] }
    Rails.logger.error "RoomsController#create: #{e.as_json}"
  end

  def destroy
    render json: client.destroy(params[:id])
  rescue => _e
    render json: { errors: ["Unable to destroy room #{params[:id]}"] }
    Rails.logger.error "RoomsController#destroy: #{e.as_json}"
  end

  def create_token
    render json: client.create_token(params[:id])
  rescue => _e
    render json: { errors: ['Unable to create room token'] }
    Rails.logger.error "RoomsController#create_token: #{e.as_json}"
  end

  def get_users
    render json: client.get_users(params[:id])
  rescue => _e
    render json: { errors: ['Unable to get room users'] }
    Rails.logger.error "RoomsController#get_users: #{e.as_json}"
  end

  private

  def client
    @client ||= Licode::Room.new
  end

  def respond_to_json
    respond_to :json
  end
end
