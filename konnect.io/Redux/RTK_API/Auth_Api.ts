"use client"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Auth_Api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://konnect-nodejs-postgres-e67fedf4c718.herokuapp.com/" }),
    endpoints: (builder) => ({

        // users/konnector/register 

        registerKonnector: builder.mutation({
            query: (formData) => ({
                url: "users/register",
                method: "POST",
                body: formData,
            }),
        }),

        verifyUser: builder.mutation({
            query: (formData) => ({
                url: "users/register/verifyUser",
                method: "POST",
                body: formData,
            }),
        }),

        sendVerificationLink: builder.mutation({
            query: (formData) => ({
                url: "sendVerificationLink",
                method: "POST",
                body: formData,
            }),
        }),

        login: builder.mutation({
            query: ({ input, user_type }) => ({
                url: user_type === "vendor" ? "users/vendor/login" : "users/login",
                method: "POST",
                body: input,
            }),
        }),

        // Forget Password 
        emailOTP: builder.mutation({
            query: (formData) => ({
                url: "users/getOTP",
                method: "POST",
                body: formData,
            }),
        }),
        verifyOTP: builder.mutation({
            query: (formData) => ({
                url: "users/verifyOTP",
                method: "POST",
                body: formData,
            }),
        }),
        recoverPassword: builder.mutation({
            query: (formData) => ({
                url: "users/recoverPassword",
                method: "POST",
                body: formData,
            }),
        }),

        // Konnector settings 

        registerPersonal: builder.query({
            query: ({ accessToken }) => ({
                url: "konnector/settings/personal",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        }),
        konnectorPersonal: builder.mutation({
            query: ({ formData, accessToken }) => ({
                url: "konnector/settings/personal",
                method: "PUT",
                body: formData,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        konnectorPassword: builder.mutation({
            query: ({ formData, accessToken }) => ({
                url: "konnector/settings/security/password",
                method: "PUT",
                body: formData,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),



        // Vendor 
        exploreVendors: builder.query({
            query: ({ page, search, categories, new: isNew, accessToken }) => {
                const params = new URLSearchParams({
                    page: page.toString(),
                    search,
                    categories,
                    new: isNew.toString(),
                });

                return {
                    url: `konnector/explore/vendors?${params.toString()}`,
                    method: "GET",
                    headers: { Authorization: `Bearer ${accessToken}` },
                };
            },
        }),

        savedVendors: builder.query({
            query: ({ page, accessToken }) => {
                const params = new URLSearchParams({
                    page: page.toString()
                });

                return {
                    url: `konnector/savedVendors?${params.toString()}`,
                    method: "GET",
                    headers: { Authorization: `Bearer ${accessToken}` },
                };
            },
        }),

        exploreAllVendors: builder.query({
            query: ({ page, search, new: isNew, accessToken }) => {
                const params = new URLSearchParams({
                    page: page.toString(),
                    search,
                    new: isNew.toString(),
                });
                return {
                    url: `konnector/explore/vendors?${params.toString()}`,
                    method: "GET",
                    headers: { Authorization: `Bearer ${accessToken}` },
                };
            },
        }),

        internalId: builder.mutation({
            query: ({ vendor_id, territory, accessToken }) => ({
                url: `/vendor/internal/${vendor_id}/${territory}`,
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),

        interactionInfo: builder.mutation({
            query: ({ formData, accessToken }) => ({
                url: "konnector/interactionInfo",
                method: "POST",
                body: formData,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),

        getBillingInformation: builder.query({
            query: ({ accessToken }) => ({
                url: "vendor/settings/billing",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        }),
        saveNewBilling: builder.mutation({
            query: ({ formattedData, accessToken }) => ({
                url: "vendor/settings/billing",
                method: "POST",
                body: formattedData,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        updateBilling: builder.mutation({
            query: ({ formattedData, accessToken }) => ({
                url: "vendor/settings/billing",
                method: "PUT",
                body: formattedData,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),

        getVendorSetting: builder.query({
            query: ({ accessToken }) => ({
                url: "vendor/settings/specs",
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` }
            })
        }),
        updateVendotSetting: builder.mutation({
            query: ({ sendUpdatedSettings, accessToken }) => ({
                url: "vendor/settings/specs",
                method: "POST",
                body: sendUpdatedSettings,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),




        // saved Vendor 
        saveVendor: builder.mutation({
            query: ({ formData, accessToken }) => ({
                url: "konnector/saveVendor",
                method: "POST",
                body: formData,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        deleteSaveVendor: builder.mutation({
            query: ({ formData, accessToken }) => ({
                url: `konnector/saveVendor/${formData?.vendor_id}`,
                method: "DELETE",
                body: formData,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        postVendor: builder.mutation({
            query: ({ formData, accessToken }) => ({
                url: "users/vendor/register",
                method: "POST",
                body: formData,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),

        // Auth vendor 
        vendorLoginWithPin: builder.mutation({
            query: (formData) => ({
                url: "users/vendor/loginWithPinAndGetCredentials",
                method: "POST",
                body: formData,
            }),
        }),

        addLoginCredentials: builder.mutation({
            query: ({ formData, vendorID }) => ({
                url: `users/vendor/addLoginCredentials/${vendorID}`,
                method: "POST",
                body: formData,
            }),
        }),

        vendorStatsWidgets: builder.query({
            query: ({ accessToken }) => ({
                url: "vendor/stats/widgets",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }),
        }),


        // New internal api.
        registerInternal: builder.mutation({
            query: ({ formData, accessToken }) => ({
                url: "users/vendor/internal/register",
                method: "POST",
                body: formData,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        getAllInternals: builder.query({
            query: ({ page, search, accessToken }) => {
                const params = new URLSearchParams({
                    page: page.toString(),
                    search,
                });

                return {
                    url: `vendor/internals?${params.toString()}`,
                    method: "GET",
                    headers: { Authorization: `Bearer ${accessToken}` },
                };
            },
        }),
        deleteVendorInternal: builder.mutation({
            query: ({ formData, accessToken }) => ({
                url: `vendor/internal/${formData?.Internal_id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),




        // admin 
        allVendorForAdmin: builder.query({
            query: ({ page, search, accessToken }) => {
                const params = new URLSearchParams({
                    page: page.toString(),
                    search,
                });
                return {
                    url: `admin/vendors?${params.toString()}`,
                    method: "GET",
                    headers: { Authorization: `Bearer ${accessToken}` },
                };
            },
        }),
        deleteVendor: builder.mutation({
            query: ({ formData, accessToken }) => ({
                url: `admin/vendor/${formData?.Internal_id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        allUserForAdmin: builder.query({
            query: ({ page, search, accessToken }) => {
                const params = new URLSearchParams({
                    page: page.toString(),
                    search,
                });
                return {
                    url: `admin/users?${params.toString()}`,
                    method: "GET",
                    headers: { Authorization: `Bearer ${accessToken}` },
                };
            },
        }),

        //Global Intraction View
        vendorStatsGlobalInteraction: builder.query({
            query: ({ accessToken }) => ({
                url: `vendor/stats/globalInteraction`,
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        konnectorFeedback: builder.mutation({
            query: ({ formData, accessToken }) => ({
                url: 'konnector/feedback',
                method: "POST",
                body: formData,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        konnectorUpdateConceal: builder.mutation({
            query: ({ formData, accessToken }) => ({
                url: 'konnector/interactionInfo/conceal',
                method: "PUT",
                body: formData,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),

        // 3rd party
        companyData: builder.mutation({
            query: ({ formData, accessToken }) => ({
                url: `companyData`,
                method: "POST",
                body: formData,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),


        // vendor Feedback ==>  
        IsFeedbackAdded: builder.mutation({
            query: ({ VendorID, accessToken }) => ({
                url: `konnector/isFeedbackAdded`,
                method: "POST",
                body: VendorID,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),

        //    logout session 
        userLogout: builder.mutation({
            query: ({ accessToken }) => ({
                url: `companyData`,
                method: "POST",
                body: accessToken,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        InternalsWithoutPagination: builder.query({
            query: ({ accessToken }) => ({
                url: `vendor/internalsWithoutPagination`,
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        vendorUnsignedChats: builder.query({
            query: ({ accessToken }) => ({
                url: `vendor/unSignedChats`,
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),

        vendorAssignChat: builder.mutation({
            query: ({ formData, accessToken }) => ({
                url: `vendor/assignChat`,
                method: "POST",
                body: formData,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),

        createSubscription: builder.mutation({
            query: ({ accessToken, body }) => {
                return {
                    url: `/create-subscription`,
                    method: "POST",
                    body,
                    headers: { Authorization: `Bearer ${accessToken}` },
                };
            },
        }),

        getCurrentSubScription: builder.query({
            query: ({ accessToken }) => ({
                url: `current-subscription`,
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        cancelSubscription: builder.mutation({
            query: ({ accessToken, body }) => {
                return {
                    url: `cancel-subscription`,
                    method: "POST",
                    body,
                    headers: { Authorization: `Bearer ${accessToken}` },
                };
            },
        }),
        saveViews: builder.mutation({
            query: ({ accessToken, formData }) => {
                return {
                    url: "konnector/views",
                    method: "POST",
                    body: formData,
                    headers: { Authorization: `Bearer ${accessToken}` },
                };
            },
        }),
        vendorStatsSnippets: builder.query({
            query: ({ accessToken }) => ({
                url: `vendor/stats/snippets`,
                method: "GET",
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        reActivateSubscription: builder.mutation({
            query: ({ accessToken, body }) => {
                return {
                    url: "konnector/views",
                    method: "POST",
                    body: body,
                    headers: { Authorization: `Bearer ${accessToken}` },
                };
            },
        }),
    })
});

export const {
    useRegisterKonnectorMutation, useVerifyUserMutation, useSendVerificationLinkMutation, useLoginMutation, useEmailOTPMutation,
    useRecoverPasswordMutation, useKonnectorPersonalMutation, useKonnectorPasswordMutation, useRegisterPersonalQuery,
    useExploreVendorsQuery, useSavedVendorsQuery, useExploreAllVendorsQuery, useInteractionInfoMutation, useSaveVendorMutation, useDeleteSaveVendorMutation,
    useVendorLoginWithPinMutation, useAddLoginCredentialsMutation, useVendorStatsWidgetsQuery, useRegisterInternalMutation,
    useGetBillingInformationQuery, useUpdateBillingMutation, useSaveNewBillingMutation, useInternalIdMutation, useGetAllInternalsQuery,
    useAllVendorForAdminQuery, useAllUserForAdminQuery, useDeleteVendorMutation, useDeleteVendorInternalMutation,useReActivateSubscriptionMutation,
    usePostVendorMutation, useVendorStatsGlobalInteractionQuery, useKonnectorFeedbackMutation, useCompanyDataMutation,
    useKonnectorUpdateConcealMutation, useGetVendorSettingQuery, useUpdateVendotSettingMutation, useIsFeedbackAddedMutation,
    useVerifyOTPMutation, useUserLogoutMutation, useInternalsWithoutPaginationQuery, useVendorUnsignedChatsQuery, useCreateSubscriptionMutation,
} = Auth_Api;
