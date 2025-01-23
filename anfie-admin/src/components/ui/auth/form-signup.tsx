import { AFDatePicker, AFSelectInfinite, BlockFormItem } from "@/components";
import {
  useListInfinityLocations,
  useListInfinityPreferGenders,
  useListInfinityPreferences,
  useMutationPreferGender,
  useMutationPreference,
  useSignup,
} from "@/hooks";
import { _common, _formatDay } from "@/utils";
import { Button, Form, Input, message } from "antd";
import { DefaultOptionType } from "antd/es/select";
import React, { useCallback } from "react";

const FormSignup = () => {
  const { mutateCreateAccount, isCreateAccountPending } = useSignup();
  const onFinish = (value: any) => {
    let preferGenders: string[] =
      value?.preferGenders?.map(
        (tag: string) => _common.findLabels(tag, preferGenderOptions)[0]
      ) ?? [];

    let preferences: string[] =
      value?.preferences?.map(
        (tag: string) => _common.findLabels(tag, preferenceOptions)[0]
      ) ?? [];

    let locations: string[] =
      value?.locations?.map(
        (tag: string) => _common.findLabels(tag, locationOptions)[0]
      ) ?? [];

    let gender: string =
      value?.gender?.map(
        (tag: string) => _common.findLabels(tag, preferGenderOptions)[0]
      )[0] ?? "";

    console.log({ gender });

    mutateCreateAccount({
      ...value,
      hash: value.password,
      preferGenders,
      preferences,
      locations,
      gender,
    });
  };

  const {
    preferGenderOptions,
    fetchNextPage: fetchNextPagePreferGenders,
    isLoading: isLoadingPreferGenders,
    total: totalPreferGenders,
    isFetchingNextPage: isFetchingNextPagePreferGenders,
  } = useListInfinityPreferGenders();

  const {
    preferenceOptions,
    fetchNextPage: fetchNextPagePreferences,
    total: totalPreferences,
    isFetchingNextPage: isFetchingNextPagePreferences,
    isLoading: isLoadingPreferences,
  } = useListInfinityPreferences();

  const {
    locationOptions,
    fetchNextPage: fetchNextPageLocations,
    total: totalLocations,
    isFetchingNextPage: isFetchingNextPageLocations,
    isLoading: isLoadingLocations,
  } = useListInfinityLocations();

  const { onCreateOrUpdatePreferGender } = useMutationPreferGender();
  const { onCreateOrUpdatePreference } = useMutationPreference();

  const handleSelectGenders = useCallback(
    (value: any, options: DefaultOptionType | DefaultOptionType[]) => {
      if (value.length > 1) {
        value.pop();
      }

      const existedTagOptionValues: string[] = preferGenderOptions.map(
        (option) => option.value
      );

      const existedTagOptionLables: string[] = preferGenderOptions.map(
        (option) => option.label
      );

      let tags: string[] = value.map(
        (tag: string) => _common.findLabels(tag, preferGenderOptions)[0]
      );

      const newTags = value.filter(
        (element: string) =>
          !existedTagOptionValues.includes(element) &&
          !existedTagOptionLables.includes(element)
      );

      if (newTags.length > 0) {
        tags = [...tags, ...newTags].filter((tag) => Boolean(tag));

        onCreateOrUpdatePreferGender({
          form: {
            name: newTags[0],
          },
        });
      }
    },

    [preferGenderOptions, onCreateOrUpdatePreferGender]
  );

  const handleSelectPreferGenders = useCallback(
    (value: any, options: DefaultOptionType | DefaultOptionType[]) => {
      console.log({ value, options });

      const existedTagOptionValues: string[] = preferGenderOptions.map(
        (option) => option.value
      );

      const existedTagOptionLables: string[] = preferGenderOptions.map(
        (option) => option.label
      );

      let tags: string[] = value.map(
        (tag: string) => _common.findLabels(tag, preferGenderOptions)[0]
      );

      const newTags = value.filter(
        (element: string) =>
          !existedTagOptionValues.includes(element) &&
          !existedTagOptionLables.includes(element)
      );

      if (newTags.length > 0) {
        tags = [...tags, ...newTags].filter((tag) => Boolean(tag));

        onCreateOrUpdatePreferGender({
          form: {
            name: newTags[0],
          },
        });
      }
    },

    [preferGenderOptions, onCreateOrUpdatePreferGender]
  );

  const handleSelectPreference = useCallback(
    (value: any, options: DefaultOptionType | DefaultOptionType[]) => {
      console.log({ value, options });

      const existedTagOptionValues: string[] = preferenceOptions.map(
        (option) => option.value
      );

      const existedTagOptionLables: string[] = preferenceOptions.map(
        (option) => option.label
      );

      let tags: string[] = value.map(
        (tag: string) => _common.findLabels(tag, preferenceOptions)[0]
      );

      const newTags = value.filter(
        (element: string) =>
          !existedTagOptionValues.includes(element) &&
          !existedTagOptionLables.includes(element)
      );

      if (newTags.length > 0) {
        tags = [...tags, ...newTags].filter((tag) => Boolean(tag));

        onCreateOrUpdatePreference({
          form: {
            name: newTags[0],
          },
        });
      }
      // setCurrentProfile((prevProfile: any) => ({
      //   ...prevProfile,
      //   preferences: tags,
      // }));
    },

    [preferenceOptions, onCreateOrUpdatePreference]
  );

  const handleSelectLocations = useCallback(
    (value: any, options: DefaultOptionType | DefaultOptionType[]) => {
      console.log({ value, options });

      let tags: string[] = value.map((tag: string) => {
        const label = _common.findLabels(tag, locationOptions)[0];
        if (!label) {
          message.error(`Location ${tag} not found!`);
        }
        return label;
      });
    },

    [locationOptions]
  );

  return (
    <Form
      name="signup"
      className="form-signup w-full"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="firstName"
        rules={[
          { required: true, message: "please input your firstname!" },
          {
            type: "string",
            message: "The input is not valid",
          },
        ]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          { required: true, message: "please input your lastname!" },
          {
            type: "string",
            message: "The input is not valid",
          },
        ]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "please input your email!" },
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirm-password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input type="password" placeholder="Comfirm Password" />
      </Form.Item>
      <Form.Item
        name="phone"
        rules={[
          { required: true, message: "please input your phone number!" },
          {
            type: "string",
            message: "The input is not valid",
          },
        ]}
      >
        <Input placeholder="Phone Number" />
      </Form.Item>
      <Form.Item name="preferences">
        <AFSelectInfinite
          allowClear
          options={preferenceOptions}
          loadMore={fetchNextPagePreferences}
          hasMore={preferenceOptions.length < totalPreferences!}
          loading={isFetchingNextPagePreferences || isLoadingPreferences}
          placeholder="Preferences"
          className="!mr-3 !w-full"
          onChange={handleSelectPreference}
        />
      </Form.Item>
      <Form.Item name="gender">
        <AFSelectInfinite
          allowClear
          options={preferGenderOptions}
          loadMore={fetchNextPagePreferGenders}
          hasMore={preferGenderOptions.length < totalPreferGenders!}
          loading={isFetchingNextPagePreferGenders || isLoadingPreferGenders}
          placeholder="Gender"
          className="!mr-3 !w-full"
          onChange={handleSelectGenders}
        />
      </Form.Item>
      <Form.Item name="preferGenders">
        <AFSelectInfinite
          allowClear
          options={preferGenderOptions}
          loadMore={fetchNextPagePreferGenders}
          hasMore={preferGenderOptions.length < totalPreferGenders!}
          loading={isFetchingNextPagePreferGenders || isLoadingPreferGenders}
          placeholder="Prefer Friend's Gender"
          className="!mr-3 !w-full"
          onChange={handleSelectPreferGenders}
        />
      </Form.Item>
      <Form.Item name="locations">
        <AFSelectInfinite
          allowClear
          options={locationOptions}
          loadMore={fetchNextPageLocations}
          hasMore={locationOptions.length < totalLocations!}
          loading={isFetchingNextPageLocations || isLoadingLocations}
          placeholder="locations"
          className="!mr-3 !w-full"
          onChange={handleSelectLocations}
        />
      </Form.Item>
      <Form.Item
        name="dob"
        rules={[
          {
            required: true,
            message: "Please input you date of birth!",
          },
        ]}
      >
        <AFDatePicker placeholder="Date of Birth" />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        disabled={isCreateAccountPending}
      >
        Sign up
      </Button>
    </Form>
  );
};

export default FormSignup;
