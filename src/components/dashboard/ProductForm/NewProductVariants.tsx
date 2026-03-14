import React, { useState } from 'react';
import { Variant } from './AddProductForm';

const NewProductVariants = ({
  onChange,
}: {
  onChange: (vars: Variant[]) => void;
}) => {
  type VariantField = keyof Variant;
  const [variants, setVariants] = useState([
    {
      sku: '',
      color: '',
      size: '',
      price: '',
      stock: '',
      urlImg: '',
    },
  ]);

  const addVariant = () => {
    setVariants([
      ...variants,
      { sku: '', color: '', size: '', price: '', stock: '', urlImg: '' },
    ]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: VariantField, value: string) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);

    onChange(updated);
  };
  return (
    <>
      <section className="form-section bg-shop_bg rounded-2xl p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <span className="text-xl text-green-600">🎨</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Các loại hàng của sản phẩm
            </h2>
          </div>
          <button
            type="button"
            className="btn-secondary rounded-lg bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700"
            onClick={addVariant}
          >
            ➕ Thêm biến thể
          </button>
        </div>
        {/*Các loại hàng sẽ ở đây */}
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div
              key={index}
              className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6"
            >
              <div className="flex justify-between">
                <h3 className="pb-4 text-xl font-semibold">
                  Loại hàng {index + 1}
                </h3>
                <button
                  className="text-lg text-red-500"
                  onClick={() => removeVariant(index)}
                >
                  🗑️ Xóa
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="flex flex-col">
                    <label>
                      SKU <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={variant.sku}
                      onChange={(e) =>
                        updateVariant(index, 'sku', e.target.value)
                      }
                      className="input-focus bg-shop_bg w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="ATB-RED-M"
                    ></input>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="flex flex-col">
                    <label>
                      Màu sắc <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={variant.color}
                      onChange={(e) =>
                        updateVariant(index, 'color', e.target.value)
                      }
                      className="input-focus bg-shop_bg w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="Red"
                    ></input>
                  </div>
                  <div className="flex flex-col">
                    <label>
                      Kích thước <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={variant.size}
                      onChange={(e) =>
                        updateVariant(index, 'size', e.target.value)
                      }
                      className="input-focus bg-shop_bg w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="M"
                    ></input>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="flex flex-col">
                    <label>Giá (VNĐ)</label>
                    <input
                      value={variant.price}
                      onChange={(e) =>
                        updateVariant(index, 'price', e.target.value)
                      }
                      className="input-focus bg-shop_bg w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="199999"
                    ></input>
                  </div>
                  <div className="flex flex-col">
                    <label>
                      Tồn kho <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={variant.stock}
                      onChange={(e) =>
                        updateVariant(index, 'stock', e.target.value)
                      }
                      className="input-focus bg-shop_bg w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="20"
                    ></input>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label>Ảnh loại hàng</label>
                  <input
                    value={variant.urlImg}
                    onChange={(e) =>
                      updateVariant(index, 'urlImg', e.target.value)
                    }
                    className="input-focus bg-shop_bg w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/variants/product.jpg"
                  ></input>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-purple-50 p-4">
          <p className="text-sm text-purple-700">
            💡 <strong>Lưu ý:</strong> Mỗi biến thể cần có SKU duy nhất, màu
            sắc, kích thước và số lượng tồn kho.
          </p>
        </div>
      </section>
    </>
  );
};

export default NewProductVariants;
