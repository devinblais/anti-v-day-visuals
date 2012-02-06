namespace :db do
  desc "Create all the initial spots and media"
  task :populate => :environment do
    Rake::Task['db:reset'].invoke

    28.times do |x|
      Spot.create({:location => (x+1)})
    end

    media = [
      {
        :format => "video",
        :src => "Motherlover.m4v",
        :name => "Mother Lover",
        :artist => "Lonely Island"
      },
      {
        :format => "video",
        :src => "TheGoldenRule.m4v",
        :name => "The Golden Rule",
        :artist => "Lonely Island ft. Lady Gaga"
      },
      {
        :format => "video",
        :src => "cupidShuffle.m4v",
        :name => "Cupid Shuffle",
        :artist => "Cupid"
      }
    ]


    media.each do |med|
      Medium.create(med)
    end

  end
end
