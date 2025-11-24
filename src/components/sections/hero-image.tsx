import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="bg-background">
      <div className="w-full">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3805fa7d-c471-4ece-ba29-a2c542545a27-luganolivinglab-ch/assets/images/683ae6c6774ed8e13452b010_about--hero-img-1.webp?"
          alt="Scenic photograph of city landscape"
          width={1920}
          height={803}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* 
        This part corresponds to the header of the next section in the original HTML.
        It is included here to match the design instruction's request for the text elements 
        that are visually adjacent to the hero image.
      */}
      <div className="py-20">
        <div className="container">
          <div className="grid grid-cols-12 items-center gap-x-6 text-primary-text text-base font-normal">
            <div className="col-span-6 md:col-span-3 lg:col-span-4">
            </div>
            {/* This empty div maintains the spacing from the original 3-column layout where an H2 was present */}
            <div className="hidden md:block md:col-span-8 lg:col-span-6" />
            <div className="col-span-6 md:col-span-1 lg:col-span-2 text-right">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;