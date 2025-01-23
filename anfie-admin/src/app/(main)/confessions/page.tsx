"use client";
import FilterConfession from "@/components/shared/filters/filter-confession";
import ConfessionInput from "@/components/ui/confessions/confession-input";
import CreateConfessionModal from "@/components/ui/confessions/create-confession-modal";
import CreateMessageRequestModal from "@/components/ui/confessions/create-message-request-modal";
import { useListInfiniteConfessions } from "@/hooks/confessions";
import { Button, Carousel, Empty } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
const ConfessionPage = () => {
  const ref = useRef<TModalRef>(null);
  const messageRequestModalRef = useRef<TModalRef>(null);

  const {
    confessions,
    fetchNextPage: fetchNextPageConfessions,
    total,
    setParams,
  } = useListInfiniteConfessions();

  const [carouselCurrent, setCarouselCurrent] = useState(0);
  const [carouselLength, setCarouselLength] = useState(0);
  const [currentItemId, setCurrentItemId] = useState(confessions[0]?.id);
  // const currentItem = confessions.find((item) => item.id === currentItemId);
  const [currentItem, setCurrentItem] = useState<TConfession>(
    confessions.find((item) => item.id === currentItemId)!
  );

  console.log({ currentItem });

  useEffect(() => {
    setCarouselLength(confessions.length);
    setCurrentItem(confessions[0]);
  }, [confessions]);

  const handleAfterChange = (current: number) => {
    if (!confessions[current]) return;
    setCurrentItemId(confessions[current].id);

    setCarouselCurrent(current);
    setCurrentItem(confessions[current]);

    if (current === carouselLength - 1 && confessions.length !== total) {
      fetchNextPageConfessions();
    }
  };

  const onAddPost = useCallback(() => {
    ref.current?.showModal();
  }, []);

  const onShowCreateMessageRequestModal = useCallback(() => {
    messageRequestModalRef.current?.showModal();
  }, []);

  return (
    <div className="w-[calc(100%-250px)] flex items-center justify-center flex-col">
      <h1 className="text-center text-blue-600 my-4">Confessions</h1>
      <ConfessionInput onAddPost={onAddPost} />
      <FilterConfession setParams={setParams} />
      <div className="text-center">
        <div className="w-[800px]">
          <Carousel
            arrows
            infinite={false}
            afterChange={handleAfterChange}
            initialSlide={carouselCurrent}
          >
            {confessions.length > 0 ? (
              confessions.map((item) => (
                <div
                  key={item.id}
                  className="h-[500px] bg-[#445F86] shadow-md rounded-md p-10 "
                >
                  <div className="flex flex-col justify-between h-full">
                    <p className="text-white text-left">{item.content}</p>
                    <div>
                      {item.tags?.map((tag: TTag) => (
                        <Button key={tag.id} type="primary" className="mr-2">
                          {tag.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-[500px] flex justify-center items-center bg-[#445F86] rounded-md p-10">
                <Empty />
              </div>
            )}
          </Carousel>
        </div>
        <Button
          type="primary"
          className="w-full h-10 mt-5"
          onClick={onShowCreateMessageRequestModal}
        >
          Send Message to the Author
        </Button>
      </div>
      <CreateConfessionModal ref={ref} />
      <CreateMessageRequestModal
        confession={currentItem!}
        ref={messageRequestModalRef}
      />
    </div>
  );
};

export default ConfessionPage;
