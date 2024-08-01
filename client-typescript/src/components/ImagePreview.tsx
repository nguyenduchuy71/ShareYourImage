import React from 'react'
import { XCircleIcon } from '@heroicons/react/20/solid';

const ImagePreview = ({ imagePreviews, handleRemoveImage }) => {
    return (
        imagePreviews.map((src, index) => (
            <div className="grid gap-4 grid-flow-col auto-cols-max py-4 mx-4">
                <div className="relative flex justify-center rounded-lg border-2 border-gray-400">
                    <img
                        className='w-40 h-40 rounded-md object-cover'
                        src={src}
                        alt={`Image Preview ${index + 1}`}
                    />
                    <div
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-1 -right-2">
                        <XCircleIcon className='hover:opacity-80 w-5 cursor-pointer' />
                    </div>
                </div>
            </div>
        ))
    )
}

export default React.memo(ImagePreview)
