require 'test_helper'

class PenaltiesControllerTest < ActionController::TestCase
  setup do
    @penalty = penalties(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:penalties)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create penalty" do
    assert_difference('Penalty.count') do
      post :create, penalty: @penalty.attributes
    end

    assert_redirected_to penalty_path(assigns(:penalty))
  end

  test "should show penalty" do
    get :show, id: @penalty.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @penalty.to_param
    assert_response :success
  end

  test "should update penalty" do
    put :update, id: @penalty.to_param, penalty: @penalty.attributes
    assert_redirected_to penalty_path(assigns(:penalty))
  end

  test "should destroy penalty" do
    assert_difference('Penalty.count', -1) do
      delete :destroy, id: @penalty.to_param
    end

    assert_redirected_to penalties_path
  end
end
