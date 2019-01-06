class ApplicationController < ActionController::Base

  private

  def restrict_to_admin_only
    redirect_to root_path unless current_user.admin?
  end
end
