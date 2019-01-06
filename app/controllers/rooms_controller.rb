class RoomsController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  before_action :respond_to_json
  # before_action :restrict_to_admin_only, only: [:create, :destroy]

  def index
    render json: client.list
  end

  def show
    render json: client.show(params[:id])
  end

  def create
    client.create(params[:room])
    render json: client.list
  end

  def destroy
    client.destroy(params[:id])
    render json: client.list
  end

  def create_token
    render json: client.create_token(params[:id])
  end

  def get_users
    render json: client.get_users(params[:id])
  end

  private

  def client
    @client ||= Licode::Room.new
  end

  def respond_to_json
    respond_to :json
  end
end
