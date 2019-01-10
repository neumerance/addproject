class RoomsController < ApplicationController
  skip_before_action :verify_authenticity_token, except: []
  respond_to :json, except: [:show]
  
  # before_action :restrict_to_admin_only, only: [:create, :destroy]

  def index
    render json: client.list
  end

  def show
    respond_to do |format|
      format.html {}
      format.json { render json: client.show(params[:id]) }
    end
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
    render json: client.create_token(params)
  end

  def get_users
    render json: client.get_users(params[:id])
  end

  private

  def client
    @client ||= Licode::Room.new
  end
end
