class PenaltiesController < ApplicationController
  def activeOnly
    @penalties = Penalty.find(:all, :conditions => ["active == ?", true])

    respond_to do |format|
      format.json { render json: @penalties }
    end
  end
  # GET /penalties
  # GET /penalties.json
  def index
    @penalties = Penalty.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @penalties }
    end
  end

  # GET /penalties/1
  # GET /penalties/1.json
  def show
    @penalty = Penalty.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @penalty }
    end
  end

  # GET /penalties/new
  # GET /penalties/new.json
  def new
    @penalty = Penalty.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @penalty }
    end
  end

  # GET /penalties/1/edit
  def edit
    @penalty = Penalty.find(params[:id])
  end

  # POST /penalties
  # POST /penalties.json
  def create
    @penalty = Penalty.new(params[:penalty])

    respond_to do |format|
      if @penalty.save
        format.html { redirect_to @penalty, notice: 'Penalty was successfully created.' }
        format.json { render json: @penalty, status: :created, location: @penalty }
      else
        format.html { render action: "new" }
        format.json { render json: @penalty.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /penalties/1
  # PUT /penalties/1.json
  def update
    @penalty = Penalty.find(params[:id])

    respond_to do |format|
      if @penalty.update_attributes(params[:penalty])
        format.html { redirect_to @penalty, notice: 'Penalty was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @penalty.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /penalties/1
  # DELETE /penalties/1.json
  def destroy
    @penalty = Penalty.find(params[:id])
    @penalty.destroy

    respond_to do |format|
      format.html { redirect_to penalties_url }
      format.json { head :ok }
    end
  end
end
