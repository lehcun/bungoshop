'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

const AskedDetail = () => {
  const faqs = [
    {
      question: 'Shopcart cung cấp những dịch vụ gì?',
      answer:
        'Shopcart cung cấp nhiều giải pháp công nghệ như phát triển phần mềm theo yêu cầu, dịch vụ điện toán đám mây và tư vấn chuyển đổi số.',
    },
    {
      question:
        'Làm thế nào để tôi nhận được hỗ trợ cho sản phẩm của Shopcart?',
      answer:
        'Bạn có thể liên hệ với đội ngũ hỗ trợ của chúng tôi thông qua Trung tâm trợ giúp hoặc biểu mẫu liên hệ trên website.',
    },
    {
      question: 'Shopcart có cung cấp khóa đào tạo cho sản phẩm không?',
      answer:
        'Có, Shopcart cung cấp các khóa đào tạo, tài liệu hướng dẫn và video để giúp bạn sử dụng sản phẩm hiệu quả nhất.',
    },
    {
      question: 'Shopcart phục vụ những ngành nghề nào?',
      answer:
        'Shopcart phục vụ đa dạng lĩnh vực như tài chính, y tế, bán lẻ, sản xuất và thương mại điện tử.',
    },
    {
      question: 'Shopcart bảo mật dữ liệu người dùng như thế nào?',
      answer:
        'Shopcart áp dụng các biện pháp bảo mật nghiêm ngặt như mã hóa dữ liệu, xác thực hai lớp và tuân thủ các tiêu chuẩn bảo mật quốc tế.',
    },
    {
      question: 'Thời gian triển khai một dự án của Shopcart là bao lâu?',
      answer:
        'Tùy vào quy mô và yêu cầu của từng dự án, thời gian triển khai có thể dao động từ vài tuần đến vài tháng. Chúng tôi luôn cam kết đúng tiến độ và chất lượng.',
    },
    {
      question: 'Shopcart có chính sách bảo hành hay bảo trì sản phẩm không?',
      answer:
        'Có, tất cả sản phẩm và giải pháp của Shopcart đều đi kèm chính sách bảo hành, bảo trì định kỳ để đảm bảo hoạt động ổn định và bền vững.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="cursor-pointer border-b border-gray-200 pb-3"
            onClick={() => toggle(index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-medium">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>

            {/* Animation phần nội dung */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <p className="mt-2 text-lg text-gray-600">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AskedDetail;
