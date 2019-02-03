class Permission
  attr_accessor :user

  COMMON_ROOM_MASTER_PERMISSIONS = [
    :respond_to_raise_hand,
    :mute, :kick, :direct_chat
  ]

  PERMISSIONS = {
    admin: COMMON_ROOM_MASTER_PERMISSIONS + [
      :create_room, :delete_room, :edit_room
    ],
    room_master: COMMON_ROOM_MASTER_PERMISSIONS
  }

  def initialize(user)
    @user = user
  end

  def can?(command)
    permissions = PERMISSIONS[user.role.to_sym] || []
    permissions.include? command
  end
end