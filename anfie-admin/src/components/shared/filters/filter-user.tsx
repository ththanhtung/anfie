"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useAtomValue } from "jotai";
import { EUserStatus } from "@/constants";
import {
  useDebounce,
  useListInfinityLocations,
  useListInfinityPreferGenders,
} from "@/hooks";
import { AFSelectInfinite } from "@/components";
import moment from "moment";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

type IProps = {
  setParams: Dispatch<SetStateAction<TGetUsersParams>>;
};
const FilterUser = ({ setParams }: IProps) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const debounceFirstname = useDebounce(firstname, 600);
  const debounceLastname = useDebounce(lastname, 600);
  const statusOptions = [
    {
      label: "Active",
      value: EUserStatus.ACTIVE,
    },
    {
      label: "Inactive",
      value: EUserStatus.BANNED,
    },
  ];

  useEffect(() => {
    if (!debounceFirstname) {
      setParams((prev) => {
        delete prev.firstname;
        return {
          ...prev,
        };
      });
      return;
    }

    setParams((prev) => ({ ...prev, firstname: debounceFirstname as string }));
  }, [debounceFirstname, setParams]);

  useEffect(() => {
    if (!debounceLastname) {
      setParams((prev) => {
        delete prev.lastname;
        return {
          ...prev,
        };
      });
      return;
    }

    setParams((prev) => ({ ...prev, lastname: debounceLastname as string }));
  }, [debounceLastname, setParams]);

  const {
    preferGenderOptions: genderOptions,
    fetchNextPage: fetchNextPageGenders,
    isLoading: isLoadingGenders,
    total: totalGenders,
    isFetchingNextPage: isFetchingNextPageGenders,
  } = useListInfinityPreferGenders();

  const {
    locationOptions,
    fetchNextPage: fetchNextPageLocations,
    total: totalLocations,
    isFetchingNextPage: isFetchingNextPageLocations,
    isLoading: isLoadingLocations,
  } = useListInfinityLocations();

  const [form] = Form.useForm();
  const [ageRange, setAgeRange] = useState<number[]>([]);

  const today = moment();
  const currentYear = today.year();

  // Calculate valid birth years
  const minBirthYear = currentYear - 100;
  const maxBirthYear = currentYear - 18;

  // Disable years outside valid range
  const disabledDate = (current: any) => {
    const year = current.year();
    return year < minBirthYear || year > maxBirthYear;
  };

  // Handle date range selection
  const handleRangeChange = (dates: any) => {
    if (dates) {
      const startYear = dates[0].year();
      const endYear = dates[1].year();

      // Calculate ages
      const startAge = currentYear - startYear;
      const endAge = currentYear - endYear;

      // Sort ages for display
      const sortedAges = [startAge, endAge].sort((a, b) => a - b);

      setParams((prev) => ({
        ...prev,
        ageRange: JSON.stringify(sortedAges),
      }));
    } else {
      setParams((prev) => ({
        ...prev,
        ageRange: JSON.stringify([]),
      }));
    }
  };

  return (
    <Form form={form} className="flex !px-4">
      <Form.Item className="!mb-0" name="firstname">
        <Input
          placeholder="First Name"
          prefix={<span className="icon-search text-neutral_600" />}
          className="!w-[200px] !mr-3"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </Form.Item>
      <Form.Item className="!mb-0" name="lastname">
        <Input
          placeholder="Last name"
          prefix={<span className="icon-search text-neutral_600" />}
          className="!w-[200px] !mr-3"
          onChange={(e) => setLastname(e.target.value)}
        />
      </Form.Item>
      <Form.Item className="!mb-0" name="gender">
        <AFSelectInfinite
          options={genderOptions}
          placeholder="Gender"
          className="!mr-3 !w-[120px]"
          onChange={(value) => {
            const genders = value
              .map((gender: string) => {
                return genderOptions.find((item) => item.value === gender);
              })
              .map((item: TOption) => item?.label);

            setParams((prev) => ({ ...prev, gender: JSON.stringify(genders) }));
          }}
          loadMore={fetchNextPageGenders}
          hasMore={genderOptions.length < totalGenders!}
          loading={isFetchingNextPageGenders || isLoadingGenders}
        />
      </Form.Item>
      <Form.Item className="!mb-0" name="status">
        <Select
          mode="tags"
          options={statusOptions}
          placeholder="Status"
          className="!mr-3 !w-[120px]"
          onChange={(value) => {
            const selections = value
              .map((value: string) => {
                return statusOptions.find((item) => item.value === value);
              })
              .map((item: TOption) => String(item?.value !== "active"));
            setParams((prev) => ({
              ...prev,
              isBanned: JSON.stringify(selections),
            }));
          }}
        />
      </Form.Item>
      <Form.Item className="!mb-0" name="location">
        <AFSelectInfinite
          options={locationOptions}
          loadMore={fetchNextPageLocations}
          hasMore={locationOptions.length < totalLocations!}
          loading={isFetchingNextPageLocations || isLoadingLocations}
          className="!mr-3 !w-[120px]"
          placeholder="Location"
          onChange={(value) => {
            const locations = value
              .map((gender: string) => {
                return locationOptions.find((item) => item.value === gender);
              })
              .map((item: TOption) => item?.label);

            setParams((prev) => ({
              ...prev,
              location: JSON.stringify(locations),
            }));
          }}
        />
      </Form.Item>
      <Form.Item className="!mb-0" name="assetTypeId">
        <RangePicker
          picker="year"
          format="YYYY"
          disabledDate={disabledDate}
          onChange={handleRangeChange}
        />
      </Form.Item>
      <Form.Item shouldUpdate className="!mb-0">
        {({ getFieldsValue }) => {
          const fieldsValue = getFieldsValue([
            "keyword",
            "assetTypeId",
            "ownership",
            "status",
          ]);
          if (Object.values(fieldsValue).filter(Boolean).length === 0) return;
          return (
            <Button
              type="default"
              onClick={() => {
                setParams((prev) => ({ page: prev.page, limit: prev.limit }));
                form.resetFields();
                setFirstname("");
                setLastname("");
                setAgeRange([]);
              }}
            >
              Reset
            </Button>
          );
        }}
      </Form.Item>
    </Form>
  );
};
export default FilterUser;
