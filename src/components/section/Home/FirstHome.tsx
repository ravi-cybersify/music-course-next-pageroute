import React from 'react'

const FirstHome = () => {
  return (
    <div className="flex flex-col text-black bg-black text-white pb-20 items-center justify-center mx-auto gap-9">
      <h1 className="text-5xl font-bold pt-32">
        E - comm Web for Music Production Fundamentals.
      </h1>
      <div className="flex flex-col items-center justify-center mx-auto gap-3">
      <p className="w-1/2 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint est ex
        ratione alias repudiandae architecto veritatis enim corporis aspernatur
        ea.
      </p>
      <p className="w-1/2 text-center">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error at modi
        omnis animi placeat eligendi earum cupiditate accusantium porro harum.
        Eaque ducimus ratione magnam nesciunt error consectetur veniam voluptate
        corrupti.
      </p>
      </div>
      <div className="">
        <button
          type="button"
          className="border px-12 py-3 rounded-2xl font-semibold bg-black text-white"
        >
          Explore
        </button>
      </div>
    </div>
  )
}

export default FirstHome
