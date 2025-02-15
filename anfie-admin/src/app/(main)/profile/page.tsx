"use client";
import { AFDatePicker, AFSelectInfinite, BlockFormItem } from "@/components";
import {
  useDebounce,
  useListInfinityLocations,
  useListInfinityPreferGenders,
  useListInfinityPreferences,
  useMutationPreferGender,
  useMutationPreference,
  useMutationUserProfile,
  useUserProfile,
} from "@/hooks";
import { _common } from "@/utils";
import { Button, Form, Input, InputNumber, message } from "antd";
import { DefaultOptionType } from "antd/es/select";
import dayjs from "dayjs";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
const ProfilePage = () => {
  const ref = useRef<TModalRef>(null);
  const { userProfile } = useUserProfile();

  const [currentProlfile, setCurrentProfile] =
    useState<TUpdateUserProfileForm>();

  const debounceProfile: TUpdateUserProfileForm = useDebounce(
    currentProlfile,
    500
  );

  const { onUpdateUserProfile } = useMutationUserProfile();

  useEffect(() => {
    console.log({ debounceProfile });
    onUpdateUserProfile({
      form: _common.removeEmptyProperties({
        firstName: debounceProfile?.firstName!,
        lastName: debounceProfile?.lastName!,
        user: debounceProfile?.user!,
        dob: debounceProfile?.dob!,
        gender: debounceProfile?.gender!,
        preferences: debounceProfile?.preferences!,
        preferGenders: debounceProfile?.preferGenders!,
        locations: debounceProfile?.locations!,
        minAge: debounceProfile?.minAge!,
        maxAge: debounceProfile?.maxAge!,
      }) as TUpdateUserProfileForm,
    });
  }, [debounceProfile, onUpdateUserProfile]);

  const [form] = Form.useForm();

  const initialValues = useMemo(() => {
    return {
      firstName: userProfile?.user?.firstName,
      lastName: userProfile?.user?.lastName,
      email: userProfile?.user?.email,
      dateOfBirth: userProfile?.user?.dob ? dayjs(userProfile?.user?.dob) : "",
      gender: userProfile?.gender,
      preferences: userProfile?.preferences?.map(
        (preference: TPreference) => preference?.name
      ),
      preferGender: userProfile?.preferGenders?.map(
        (preferGender: TPreferGender) => preferGender?.name
      ),
      locations: userProfile?.locations?.map(
        (location: TLocation) => location?.name
      ),
      minAge: userProfile?.minAge,
      maxAge: userProfile?.maxAge,
    };
  }, [userProfile]);
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const {
    preferGenderOptions,
    fetchNextPage: fetchNextPagePreferGenders,
    isLoading: isLoadingPreferGenders,
    total: totalPreferGenders,
    isFetchingNextPage: isFetchingNextPagePreferGenders,
  } = useListInfinityPreferGenders();
  const {
    preferenceOptions,
    fetchNextPage: sPreferences,
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

  const { onCreateOrUpdatePreference } = useMutationPreference();
  const { onCreateOrUpdatePreferGender } = useMutationPreferGender();

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
        (tag: string) => findLabels(tag, preferenceOptions)[0]
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
      setCurrentProfile((prevProfile: any) => ({
        ...prevProfile,
        preferences: tags,
      }));
    },

    [preferenceOptions, onCreateOrUpdatePreference]
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
        (tag: string) => findLabels(tag, preferGenderOptions)[0]
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
      setCurrentProfile((prevProfile: any) => ({
        ...prevProfile,
        preferGenders: tags,
      }));
    },

    [preferGenderOptions, onCreateOrUpdatePreferGender]
  );

  const handleSelectGenders = useCallback(
    (value: any, options: DefaultOptionType | DefaultOptionType[]) => {
      console.log({ value, options });

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
        (tag: string) => findLabels(tag, preferGenderOptions)[0]
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
      setCurrentProfile((prevProfile: any) => ({
        ...prevProfile,
        gender: tags[0],
      }));
    },

    [preferGenderOptions, onCreateOrUpdatePreferGender]
  );

  const handleSelectLocations = useCallback(
    (value: any, options: DefaultOptionType | DefaultOptionType[]) => {
      console.log({ value, options });

      let tags: string[] = value.map((tag: string) => {
        const label = findLabels(tag, locationOptions)[0];
        if (!label) {
          message.error(`Location ${tag} not found!`);
        }
        return label;
      });

      setCurrentProfile((prevProfile: any) => ({
        ...prevProfile,
        locations: tags.filter((tag) => Boolean(tag)),
      }));
    },

    [locationOptions]
  );

  const handleChange = (field: string, value: any) => {
    setCurrentProfile((prevProfile: any) => {
      const updatedProfile = {
        ...prevProfile,
        [field]: value,
      };

      return updatedProfile;
    });
  };

  function findLabels(valueOrLabel: string, options: TOption[]): string[] {
    const labels: string[] = [];

    for (const option of options) {
      if (option.value === valueOrLabel || option.label === valueOrLabel) {
        labels.push(option.label);
      }
    }

    return labels;
  }

  return (
    <div className="w-[calc(100%-250px)] flex items-center justify-center flex-col">
      <h1 className="text-center text-blue-600 my-4">Profile</h1>
      <div className="w-[500px]">
        <Form form={form} initialValues={initialValues}>
          <BlockFormItem label="Full Name" required>
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "First name is required",
                  },
                ]}
              >
                <Input
                  placeholder="First Name"
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Last name is required",
                  },
                ]}
              >
                <Input
                  placeholder="Last Name"
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </Form.Item>
            </div>
          </BlockFormItem>
          <BlockFormItem label="Email">
            <Form.Item name="email">
              <Input
                placeholder="Email"
                className="w-full"
                onChange={(e) => handleChange("title", e.target.value)}
                disabled
              />
            </Form.Item>
          </BlockFormItem>
          <BlockFormItem label="Gender">
            <Form.Item name="gender">
              <AFSelectInfinite
                allowClear
                options={preferGenderOptions}
                loadMore={fetchNextPagePreferGenders}
                hasMore={preferGenderOptions.length < totalPreferGenders!}
                loading={
                  isFetchingNextPagePreferGenders || isLoadingPreferGenders
                }
                placeholder="Gender"
                className="!mr-3 !w-full"
                onChange={handleSelectGenders}
              />
            </Form.Item>
          </BlockFormItem>
          <BlockFormItem label="Date of Birth">
            <Form.Item name="dateOfBirth">
              <AFDatePicker
                placeholder="Date of Birth"
                onChange={(e) =>
                  handleChange("dob", dayjs(e).format("YYYY-MM-DD"))
                }
              />
            </Form.Item>
          </BlockFormItem>
          <BlockFormItem label="preferences">
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
          </BlockFormItem>
          <BlockFormItem label="Prefer Partner Gender">
            <Form.Item name="preferGender">
              <AFSelectInfinite
                allowClear
                options={preferGenderOptions}
                loadMore={fetchNextPagePreferGenders}
                hasMore={preferGenderOptions.length < totalPreferGenders!}
                loading={
                  isFetchingNextPagePreferGenders || isLoadingPreferGenders
                }
                placeholder="Preferences"
                className="!mr-3 !w-full"
                onChange={handleSelectPreferGenders}
              />
            </Form.Item>
          </BlockFormItem>
          <BlockFormItem label="Prefer Partner Locations">
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
          </BlockFormItem>
          <BlockFormItem label="Partner Age Range">
            <div className="grid grid-cols-2 gap-4">
              <Form.Item name="minAge">
                <InputNumber
                  placeholder="Min Age"
                  className="w-full"
                  min={16}
                  onChange={(e) => handleChange("minAge", e)}
                />
              </Form.Item>
              <Form.Item className="!mb-0">
                <Form.Item name="maxAge">
                  <InputNumber
                    placeholder="Max Age"
                    className="w-full"
                    min={17}
                    onChange={(e) => handleChange("maxAge", e)}
                  />
                </Form.Item>
              </Form.Item>
            </div>
          </BlockFormItem>
          <Button type="primary" className="w-full capitalize">
            change password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ProfilePage;
