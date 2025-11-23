'use client';

import React, { useState } from 'react';
import { Image } from './AddProductForm';

const NewProductImages = ({
  onChange,
}: {
  onChange: (imgs: Image[]) => void;
}) => {
  const [images, setImages] = useState([{ url: '', alt: '' }]);

  const addImage = () => {
    setImages([...images, { url: '', alt: '' }]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Image, value: string) => {
    const newImages = [...images];
    newImages[index][field] = value;
    setImages(newImages);

    onChange(newImages);
  };
  return (
    <>
      {/* Images */}
      <section className="form-section rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <span className="text-xl text-green-600">🖼️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Hình Ảnh Sản Phẩm
            </h2>
          </div>
          <button
            type="button"
            className="btn-secondary rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
            onClick={addImage}
          >
            ➕ Thêm Ảnh
          </button>
        </div>
        {/*Các hình ảnh sẽ ở đây */}
        <div className="space-y-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6"
            >
              <div className="flex justify-between">
                <h3 className="pb-4 text-xl font-semibold">
                  🖼️ Hình ảnh {index + 1}
                </h3>
                <button
                  className="text-lg text-red-500"
                  onClick={() => removeImage(index)}
                >
                  🗑️ Xóa
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="flex flex-col">
                  <label>
                    URL Hình Ảnh <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    className="input-focus w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/images/product.jpg"
                    value={image.url}
                    onChange={(e) => handleChange(index, 'url', e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col">
                  <label>
                    Alt Text <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="alt"
                    required
                    className="input-focus w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Ảnh mặt trước sản phẩm"
                    value={image.alt}
                    onChange={(e) => handleChange(index, 'alt', e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-blue-700">
            💡 <strong>Lưu ý:</strong> Thêm ít nhất 2 hình ảnh cho sản phẩm. Ảnh
            đầu tiên sẽ là ảnh chính.
          </p>
        </div>
      </section>
    </>
  );
};

export default NewProductImages;
