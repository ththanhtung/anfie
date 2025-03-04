import { AFDatePicker, AFSelectInfinite, BlockFormItem } from "@/components";
import UploadImage from "@/components/upload/upload-image";
import {
  useListInfinityLocations,
  useListInfinityPreferGenders,
  useListInfinityPreferences,
  useMutationPreferGender,
  useMutationPreference,
  useSignup,
} from "@/hooks";
import { _common, _formatDay } from "@/utils";
import { Button, Form, Input, InputNumber, message } from "antd";
import { DefaultOptionType } from "antd/es/select";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const FormSignup = () => {
  const { isCreateAccountPending, onSignup } = useSignup();
  const router = useRouter();

  const onFinish = (value: any) => {
    const formData = new FormData();

    // Add all standard fields
    Object.entries(value).forEach(([key, val]) => {
      if (
        ![
          "preferGenders",
          "preferences",
          "selfDescribed",
          "locations",
          "gender",
          "medias",
          "dob",
        ].includes(key)
      ) {
        formData.append(key, val as string);
      }
    });

    formData.append("dob", dayjs(value.dob).format("YYYY-MM-DD"));

    let preferGenders: string[] =
      value?.preferGenders?.map(
        (tag: string) => _common.findLabels(tag, preferGenderOptions)[0]
      ) ?? [];
    formData.append("preferGenders", JSON.stringify(preferGenders));

    let preferences: string[] =
      value?.preferences?.map(
        (tag: string) => _common.findLabels(tag, preferenceOptions)[0]
      ) ?? [];
    formData.append("preferences", JSON.stringify(preferences));

    let selfDescribed: string[] =
      value?.selfDescribed?.map(
        (tag: string) => _common.findLabels(tag, preferenceOptions)[0]
      ) ?? [];
    formData.append("selfDescribed", JSON.stringify(selfDescribed));

    let locations: string[] =
      value?.locations?.map(
        (tag: string) => _common.findLabels(tag, locationOptions)[0]
      ) ?? [];
    formData.append("locations", JSON.stringify(locations));

    let gender: string =
      value?.gender?.map(
        (tag: string) => _common.findLabels(tag, preferGenderOptions)[0]
      )[0] ?? "";
    formData.append("gender", gender);

    // Add hash/password conversion
    if (value.password) {
      formData.append("hash", value.password);
    }
    const { medias } = value;

    if (medias && medias?.length > 0) {
      medias?.forEach((media: any) => {
        formData.append("medias", media?.originFileObj);
      });
    }
    // Send FormData instead of regular object
    onSignup({
      form: formData,
      cb: () => {
        router.push("/");
      },
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
    (
      value: any,
      options: DefaultOptionType | DefaultOptionType[] | undefined
    ) => {
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
    (
      value: any,
      options: DefaultOptionType | DefaultOptionType[] | undefined
    ) => {
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
    (
      value: any,
      options: DefaultOptionType | DefaultOptionType[] | undefined
    ) => {
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
    },

    [preferenceOptions, onCreateOrUpdatePreference]
  );

  const handleSelectLocations = useCallback(
    (
      value: any,
      options: DefaultOptionType | DefaultOptionType[] | undefined
    ) => {
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
    <div className="h-full">
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
          name="bio"
          rules={[
            {
              type: "string",
              message: "The input is not valid",
            },
          ]}
        >
          <Input placeholder="Tell something about yourself" />
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
        <Form.Item name="selfDescribed">
          <AFSelectInfinite
            allowClear
            options={preferenceOptions}
            loadMore={fetchNextPagePreferences}
            hasMore={preferenceOptions.length < totalPreferences!}
            loading={isFetchingNextPagePreferences || isLoadingPreferences}
            placeholder="Self Described"
            className="!mr-3 !w-full"
            onChange={handleSelectPreference}
          />
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
        <BlockFormItem label="Partner Age Range">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="minAge">
              <InputNumber placeholder="Min Age" className="w-full" min={16} />
            </Form.Item>
            <Form.Item className="!mb-0">
              <Form.Item name="maxAge">
                <InputNumber
                  placeholder="Max Age"
                  className="w-full"
                  min={17}
                />
              </Form.Item>
            </Form.Item>
          </div>
        </BlockFormItem>
        <BlockFormItem label="Pictures of You:">
          <Form.Item name="medias">
            <UploadImage maxCount={5} />
          </Form.Item>
        </BlockFormItem>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isCreateAccountPending}
        >
          Sign up
        </Button>
      </Form>
    </div>
  );
};

export default FormSignup;
