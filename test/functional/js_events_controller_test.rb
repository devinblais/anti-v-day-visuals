require 'test_helper'

class JsEventsControllerTest < ActionController::TestCase
  setup do
    @js_event = js_events(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:js_events)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create js_event" do
    assert_difference('JsEvent.count') do
      post :create, js_event: @js_event.attributes
    end

    assert_redirected_to js_event_path(assigns(:js_event))
  end

  test "should show js_event" do
    get :show, id: @js_event.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @js_event.to_param
    assert_response :success
  end

  test "should update js_event" do
    put :update, id: @js_event.to_param, js_event: @js_event.attributes
    assert_redirected_to js_event_path(assigns(:js_event))
  end

  test "should destroy js_event" do
    assert_difference('JsEvent.count', -1) do
      delete :destroy, id: @js_event.to_param
    end

    assert_redirected_to js_events_path
  end
end
