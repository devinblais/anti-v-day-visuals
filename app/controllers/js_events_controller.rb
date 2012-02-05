class JsEventsController < ApplicationController
  # GET /js_events
  # GET /js_events.json
  def getAndDelete
    @js_events = JsEvent.order('created_at ASC').all

    @js_events.each do |e|
      e.destroy()
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @js_events }
    end
  end
  
  def index
    @js_events = JsEvent.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @js_events }
    end
  end

  # GET /js_events/1
  # GET /js_events/1.json
  def show
    @js_event = JsEvent.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @js_event }
    end
  end

  # GET /js_events/new
  # GET /js_events/new.json
  def new
    @js_event = JsEvent.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @js_event }
    end
  end

  # GET /js_events/1/edit
  def edit
    @js_event = JsEvent.find(params[:id])
  end

  # POST /js_events
  # POST /js_events.json
  def create
    @js_event = JsEvent.new(params[:js_event])

    respond_to do |format|
      if @js_event.save
        format.html { redirect_to @js_event, notice: 'Js event was successfully created.' }
        format.json { render json: @js_event, status: :created, location: @js_event }
      else
        format.html { render action: "new" }
        format.json { render json: @js_event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /js_events/1
  # PUT /js_events/1.json
  def update
    @js_event = JsEvent.find(params[:id])

    respond_to do |format|
      if @js_event.update_attributes(params[:js_event])
        format.html { redirect_to @js_event, notice: 'Js event was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @js_event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /js_events/1
  # DELETE /js_events/1.json
  def destroy
    @js_event = JsEvent.find(params[:id])
    @js_event.destroy

    respond_to do |format|
      format.html { redirect_to js_events_url }
      format.json { head :ok }
    end
  end
end
