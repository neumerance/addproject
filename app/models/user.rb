class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # roles
  def subscriber?
    role == :subscriber
  end

  def room_master?
    role == :room_master
  end

  def admin?
    role == :admin
  end
end
