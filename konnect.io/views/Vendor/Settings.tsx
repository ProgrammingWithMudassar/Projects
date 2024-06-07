"use client"
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { SettingFormValues, SettingDropDownValues } from '@/types/types'
import Button from '@/components/shared/Button'
import RingLoader from "react-spinners/RingLoader";
import { BsArrowRight } from "react-icons/bs";
import { useGetVendorSettingQuery, useUpdateVendotSettingMutation } from '@/Redux/RTK_API/Auth_Api';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import SelectDropDown from "@/components/shared/SelectDropDown";
import {
    EncryptionStandardsOptions, FirewallTypesOptions, ComplianceTemplatesOptions,
    SupportedProtocolsOptions, DeviceControlOptions,ConsensusAlgorithmsOptions,
    networkArchitectureOptions, backupOptions, DataResidencyOptions
} from '@/json/Vendor/Setting'
import { toast } from 'react-toastify';
import CheckBox from '@/components/shared/CheckBox'



type ApiResponse = {
    data?: any;
    error?: { status?: any } & (FetchBaseQueryError | SerializedError);
    status?: any;
};


const VendorSetting = () => {
    const { user, token } = useAuth();
    const userCategories: any[] = user?.categories?.list || [];
    const [Loading, setLoading] = useState(false);
    const [check, SetCheck] = useState<boolean>(false)


    const [DropDownData, setDropDownData] = useState<SettingDropDownValues>({
        EncryptionStandards: { value: "", label: "" },
        DataBackupMethods: { value: "", label: "" },
        AuthenticationProtocols: { value: "", label: "" },
        DataResidency: { value: "", label: "" },
        FirewallTypes: { value: "", label: "" },
        ComplianceTemplates: { value: "", label: "" },
        SupportedProtocols: { value: "", label: "" },
        DeviceControl: { value: "", label: "" },
        ConsensusAlgorithms: { value: "", label: "" },
        SecureNetworkArchitecture: { value: "", label: "" },
    })

    const [Input, setInput] = useState<SettingFormValues>({
        IntrusionDetectionSystem: false,
        IntrusionPreventionSystem: false,
        VirtualPrivateNetworkSupport: false,
        IDS: false,
        DataMasking: false,
        Tokenization: false,
        PermissionManagement: false,
        AuditActivityLogs: false,
        UnstructuredDataGovernance: false,
        RegularAccessReviews: false,
        AccessRequestWorkflows: false,
        SegregationOfDuties: false,
        RecertificationCycles: false,
        ComplianceReporting: false,
        RiskAssessmentTools: false,
        PolicyManagement: false,
        ContinuousMonitoring: false,
        MalwareDetection: false,
        HostBasedIntrusionPrevention: false,
        OfflineProtection: false,
        RealTimeAnalysis: false,
        ThreatHuntingCapability: false,
        ThreatSharingCapability: false,
        PhishingSimulations: false,
        CustomizableCourseContent: false,
        RegularlyUpdatedMaterial: false,
        ReportingAnalytics: false,
        ForensicCapabilities: false,
        AutomatedResponse: false,
        PlaybookIntegration: false,
        PostIncidentAnalysis: false,
        DeviceAuthentication: false,
        FirmwareUpdates: false,
        AnomalyDetection: false,
        DeviceInventoryManagement: false,
        PhishingProtection: false,
        DataLossPreventionDLP: false,
        EmailEncryption: false,
        SandboxAnalysis: false,
        LogCollection: false,
        EventCorrelation: false,
        RealTimeAlertingSIEM: false,
        HistoricalAnalysis: false,
        TrafficAnalysis: false,
        CloudBasedMitigation: false,
        RateLimiting: false,
        ApplicationLayerProtection: false,
        MobileDeviceManagement: false,
        MobileApplicationManagement: false,
        ThreatProtection: false,
        DataLeakPrevention: false,
        SmartContractVerification: false,
        Interoperability: false,
        ContentFiltering: false,
        BrowserIsolation: false,
        SSLInspection: false,
        MalwareScanning: false,
        MultiFactorAuthentication: false,
        RoleBasedAccessControl: false,
        UserLifecycleManagement: false,
        SessionMonitoring: false,
        PasswordVaulting: false,
        PrivilegeDelegation: false,
        TimeLimitedAccess: false,
        CloudConfigurationManagement: false,
        APISecurity: false,
        VirtualPrivateCloudConfigurations: false,
        ThreatHunting: false,
        RealTimeAlerting: false,
        SecurityOrchestration: false,
        StaticTestingSAST: false,
        DynamicTestingDAST: false,
        RuntimeProtectionRASP: false,
        WebApplicationFirewallsWAF: false,
        Antivirus: false,
        PatchUpdateManagement: false
    });

    const [updateVendorSetting] = useUpdateVendotSettingMutation();
    const { data, isLoading, refetch } = useGetVendorSettingQuery({ accessToken: token });
    console.log("data", data);


    useEffect(() => {
        if (data?.specs) {
            const {
                DataProtection, DataAccessGovernance, AccessGovernanse, FoundationalSecurity,
                RiskCompliance, EndpointSecurity, NetworkSecurity, ThreatIntelligence,
                SecurityAwarenessTraining, IncidentResponse, IotSecurity, EmailSecurity,
                SIEM, DDOSProtection, MobileSecurity, Blockchain, WebSecurity, IdentityManagement,
                PrivilegedAccessManagement, CloudSecurity, SecurityOperations, ApplicationSecurity,
            } = data.specs;


            if (DataProtection) {
                setDropDownData(prevState => ({
                    ...prevState,
                    EncryptionStandards: {
                        value: data?.specs?.DataProtection?.EncryptionStandards  ?? "",
                        label: data?.specs?.DataProtection?.EncryptionStandards  ?? "",
                    },
                    DataBackupMethods: {
                        value: data?.specs?.DataProtection?.DataBackupMethods  ?? "",
                        label: data?.specs?.DataProtection?.DataBackupMethods  ?? "",
                    }
                }))
                setInput(prevState => ({
                    ...prevState,
                    DataMasking: DataProtection.DataMasking || false,
                    Tokenization: DataProtection.Tokenization || false,
                }));
            }
            if (DataAccessGovernance) {
                setInput(prevState => ({
                    ...prevState,
                    PermissionManagement: DataAccessGovernance.PermissionManagement || false,
                    AuditActivityLogs: DataAccessGovernance.AuditActivityLogs || false,
                    UnstructuredDataGovernance: DataAccessGovernance.UnstructuredDataGovernance || false,
                    RegularAccessReviews: DataAccessGovernance.RegularAccessReviews || false,
                }));
            }
            if (AccessGovernanse) {
                setInput(prevState => ({
                    ...prevState,
                    AccessRequestWorkflows: AccessGovernanse.AccessRequestWorkflows || false,
                    ComplianceReporting: AccessGovernanse.ComplianceReporting || false,
                    SegregationOfDuties: AccessGovernanse.SegregationOfDuties || false,
                    RecertificationCycles: AccessGovernanse.RecertificationCycles || false,
                }));
            }
            if (FoundationalSecurity) {
                setDropDownData(prevState => ({
                    ...prevState,
                    FirewallTypes: {
                        value: data?.specs?.FoundationalSecurity?.FirewallTypes ?? "",
                        label: data?.specs?.FoundationalSecurity?.FirewallTypes  ?? "",
                    }
                }))
                setInput(prevState => ({
                    ...prevState,
                    Antivirus: FoundationalSecurity.Antivirus || false,
                    PatchUpdateManagement: FoundationalSecurity.PatchUpdateManagement || false,
                    IDS: FoundationalSecurity.IDS || false,
                }));
            }
            if (RiskCompliance) {
                setDropDownData(prevState => ({
                    ...prevState,
                    ComplianceTemplates: {
                        value: data?.specs?.RiskCompliance?.ComplianceTemplates  ?? "",
                        label: data?.specs?.RiskCompliance?.ComplianceTemplates  ?? "",
                    }
                }))
                setInput(prevState => ({
                    ...prevState,
                    RiskAssessmentTools: RiskCompliance.RiskAssessmentTools || false,
                    PolicyManagement: RiskCompliance.PolicyManagement || false,
                    ContinuousMonitoring: RiskCompliance.ContinuousMonitoring || false,
                }));
            }
            if (EndpointSecurity) {
                setDropDownData(prevState => ({
                    ...prevState,
                    DeviceControl: {
                        value: data?.specs?.EndpointSecurity?.DeviceControl  ?? "",
                        label: data?.specs?.EndpointSecurity?.DeviceControl  ?? "",
                    }
                }))
                setInput(prevState => ({
                    ...prevState,
                    MalwareDetection: EndpointSecurity.MalwareDetection || false,
                    HostBasedIntrusionPrevention: EndpointSecurity.HostBasedIntrusionPrevention || false,
                    OfflineProtection: EndpointSecurity.OfflineProtection || false,
                }));
            }
            if (NetworkSecurity) {
                setDropDownData(prevState => ({
                    ...prevState,
                    SecureNetworkArchitecture: {
                        value: data?.specs?.NetworkSecurity?.DeviceControl  ?? "",
                        label: data?.specs?.NetworkSecurity?.DeviceControl  ?? "",
                    }
                }))
                setInput(prevState => ({
                    ...prevState,
                    IntrusionDetectionSystem: NetworkSecurity.IntrusionDetectionSystem || false,
                    IntrusionPreventionSystem: NetworkSecurity.IntrusionPreventionSystem || false,
                    VirtualPrivateNetworkSupport: NetworkSecurity.VirtualPrivateNetworkSupport || false,
                }));
            }
            if (ThreatIntelligence) {
                setInput(prevState => ({
                    ...prevState,
                    RealTimeAnalysis: ThreatIntelligence.RealTimeAnalysis || false,
                    ThreatHuntingCapability: ThreatIntelligence.ThreatHuntingCapability || false,
                    ThreatSharingCapability: ThreatIntelligence.ThreatSharingCapability || false,
                }));
            }
            if (SecurityAwarenessTraining) {
                setInput(prevState => ({
                    ...prevState,
                    PhishingSimulations: SecurityAwarenessTraining.PhishingSimulations || false,
                    CustomizableCourseContent: SecurityAwarenessTraining.CustomizableCourseContent || false,
                    RegularlyUpdatedMaterial: SecurityAwarenessTraining.RegularlyUpdatedMaterial || false,
                    ReportingAnalytics: SecurityAwarenessTraining.ReportingAnalytics || false,
                }));
            }
            if (IncidentResponse) {
                setInput(prevState => ({
                    ...prevState,
                    ForensicCapabilities: IncidentResponse.ForensicCapabilities || false,
                    AutomatedResponse: IncidentResponse.AutomatedResponse || false,
                    PlaybookIntegration: IncidentResponse.PlaybookIntegration || false,
                    PostIncidentAnalysis: IncidentResponse.PostIncidentAnalysis || false,
                }));
            }
            if (IotSecurity) {
                setInput(prevState => ({
                    ...prevState,
                    DeviceAuthentication: IotSecurity.DeviceAuthentication || false,
                    FirmwareUpdates: IotSecurity.FirmwareUpdates || false,
                    AnomalyDetection: IotSecurity.AnomalyDetection || false,
                    DeviceInventoryManagement: IotSecurity.DeviceInventoryManagement || false,
                }));
            }
            if (EmailSecurity) {
                setInput(prevState => ({
                    ...prevState,
                    PhishingProtection: EmailSecurity.PhishingProtection || false,
                    DataLossPreventionDLP: EmailSecurity.DataLossPreventionDLP || false,
                    EmailEncryption: EmailSecurity.EmailEncryption || false,
                    SandboxAnalysis: EmailSecurity.SandboxAnalysis || false,
                }));
            }
            if (SIEM) {
                setInput(prevState => ({
                    ...prevState,
                    LogCollection: SIEM.LogCollection || false,
                    EventCorrelation: SIEM.EventCorrelation || false,
                    RealTimeAlertingSIEM: SIEM.RealTimeAlertingSIEM || false,
                    HistoricalAnalysis: SIEM.HistoricalAnalysis || false,
                }));
            }
            if (DDOSProtection) {
                setInput(prevState => ({
                    ...prevState,
                    TrafficAnalysis: DDOSProtection.TrafficAnalysis || false,
                    CloudBasedMitigation: DDOSProtection.CloudBasedMitigation || false,
                    RateLimiting: DDOSProtection.RateLimiting || false,
                    ApplicationLayerProtection: DDOSProtection.ApplicationLayerProtection || false,
                }));
            }
            if (MobileSecurity) {
                setInput(prevState => ({
                    ...prevState,
                    MobileDeviceManagement: MobileSecurity.MobileDeviceManagement || false,
                    MobileApplicationManagement: MobileSecurity.MobileApplicationManagement || false,
                    ThreatProtection: MobileSecurity.ThreatProtection || false,
                    DataLeakPrevention: MobileSecurity.DataLeakPrevention || false,
                }));
            }
            if (Blockchain) {
                setDropDownData(prevState => ({
                    ...prevState,
                    SupportedProtocols: {
                        value: data?.specs?.Blockchain?.SupportedProtocols  ?? "",
                        label: data?.specs?.Blockchain?.SupportedProtocols  ?? "",
                    },
                    ConsensusAlgorithms: {
                        value: data?.specs?.Blockchain?.ConsensusAlgorithms  ?? "",
                        label: data?.specs?.Blockchain?.ConsensusAlgorithms  ?? "",
                    }
                }))
                setInput(prevState => ({
                    ...prevState,
                    SmartContractVerification: Blockchain.SmartContractVerification || false,
                    Interoperability: Blockchain.Interoperability || false,
                }));
            }
            if (WebSecurity) {
                setInput(prevState => ({
                    ...prevState,
                    ContentFiltering: WebSecurity.ContentFiltering || false,
                    BrowserIsolation: WebSecurity.BrowserIsolation || false,
                    SSLInspection: WebSecurity.SSLInspection || false,
                    MalwareScanning: WebSecurity.MalwareScanning || false,
                }));
            }
            if (IdentityManagement) {
                setDropDownData(prevState => ({
                    ...prevState,
                    AuthenticationProtocols: {
                        value: data?.specs?.DataProtection?.AuthenticationProtocols  ?? "",
                        label: data?.specs?.DataProtection?.AuthenticationProtocols  ?? "",
                    }
                }))
                setInput(prevState => ({
                    ...prevState,
                    MultiFactorAuthentication: IdentityManagement.MultiFactorAuthentication || false,
                    RoleBasedAccessControl: IdentityManagement.RoleBasedAccessControl || false,
                    UserLifecycleManagement: IdentityManagement.UserLifecycleManagement || false,
                }));
            }
            if (PrivilegedAccessManagement) {
                setInput(prevState => ({
                    ...prevState,
                    SessionMonitoring: PrivilegedAccessManagement.SessionMonitoring || false,
                    PasswordVaulting: PrivilegedAccessManagement.PasswordVaulting || false,
                    PrivilegeDelegation: PrivilegedAccessManagement.PrivilegeDelegation || false,
                    TimeLimitedAccess: PrivilegedAccessManagement.TimeLimitedAccess || false,
                }));
            }
            if (CloudSecurity) {
                setInput(prevState => ({
                    ...prevState,
                    CloudConfigurationManagement: CloudSecurity.CloudConfigurationManagement || false,
                    VirtualPrivateCloudConfigurations: CloudSecurity.VirtualPrivateCloudConfigurations || false,
                    APISecurity: CloudSecurity.APISecurity || false,
                }));
                setDropDownData(prevState => ({
                    ...prevState,
                    DataResidency: {
                        value: data?.specs?.CloudSecurity?.DataResidency  ?? "",
                        label: data?.specs?.CloudSecurity?.DataResidency  ?? "",
                    }
                }))
            }

            if (SecurityOperations) {
                setInput(prevState => ({
                    ...prevState,
                    ThreatHunting: SecurityOperations.ThreatHunting || false,
                    RealTimeAlerting: SecurityOperations.RealTimeAlerting || false,
                    SecurityOrchestration: SecurityOperations.SecurityOrchestration || false,
                }));
            }
            if (ApplicationSecurity) {
                setInput(prevState => ({
                    ...prevState,
                    StaticTestingSAST: ApplicationSecurity.StaticTestingSAST || false,
                    DynamicTestingDAST: ApplicationSecurity.DynamicTestingDAST || false,
                    RuntimeProtectionRASP: ApplicationSecurity.RuntimeProtectionRASP || false,
                    WebApplicationFirewallsWAF: ApplicationSecurity.WebApplicationFirewallsWAF || false,
                }));
            }

        }
    }, [data, data?.specs]);

    const updateUserSettings = async () => {
        setLoading(true);
        let updatedSettings = {};

        // Check if user has data protection category
        if (userCategories.includes('DataProtection')) {
            updatedSettings = {
                ...updatedSettings,
                DataProtection: {
                    EncryptionStandards: DropDownData.EncryptionStandards?.value,
                    DataBackupMethods: DropDownData.DataBackupMethods?.value,
                    DataMasking: Input.DataMasking,
                    Tokenization: Input.Tokenization,
                }
            };
        }
        // Check if user has data access governance category
        if (userCategories.includes('DataAccessGovernance')) {
            updatedSettings = {
                ...updatedSettings,
                DataAccessGovernance: {
                    PermissionManagement: Input.PermissionManagement,
                    AuditActivityLogs: Input.AuditActivityLogs,
                    UnstructuredDataGovernance: Input.UnstructuredDataGovernance,
                    RegularAccessReviews: Input.RegularAccessReviews,
                }
            };
        }
        // Check if user has data access governance category
        if (userCategories.includes('AccessGovernanse')) {
            updatedSettings = {
                ...updatedSettings,
                AccessGovernanse: {

                    AccessRequestWorkflows: Input.AccessRequestWorkflows,
                    ComplianceReporting: Input.ComplianceReporting,
                    SegregationOfDuties: Input.SegregationOfDuties,
                    RecertificationCycles: Input.RecertificationCycles,
                }
            };
        }
        // Check if user has foundational security category
        if (userCategories.includes('FoundationalSecurity')) {
            updatedSettings = {
                ...updatedSettings,
                FoundationalSecurity: {
                    FirewallTypes: DropDownData.FirewallTypes?.value,
                    Antivirus: Input.Antivirus,
                    PatchUpdateManagement: Input.PatchUpdateManagement,
                    IDS: Input.IDS,
                }
            };
        }
        // Check if user has RiskCompliance category
        if (userCategories.includes('RiskCompliance')) {
            updatedSettings = {
                ...updatedSettings,
                RiskCompliance: {
                    ComplianceTemplates: DropDownData.ComplianceTemplates?.value,
                    RiskAssessmentTools: Input.RiskAssessmentTools,
                    PolicyManagement: Input.PolicyManagement,
                    ContinuousMonitoring: Input.ContinuousMonitoring,
                }
            };
        }
        // Check if user has EndpointSecurity category
        if (userCategories.includes('EndpointSecurity')) {
            updatedSettings = {
                ...updatedSettings,
                EndpointSecurity: {
                    DeviceControl: DropDownData.DeviceControl?.value,
                    MalwareDetection: Input.MalwareDetection,
                    HostBasedIntrusionPrevention: Input.HostBasedIntrusionPrevention,
                    OfflineProtection: Input.OfflineProtection,
                }
            };
        }
        // Check if user has NetworkSecurity category
        if (userCategories.includes('NetworkSecurity')) {
            updatedSettings = {
                ...updatedSettings,
                NetworkSecurity: {
                    IntrusionDetectionSystem: Input.IntrusionDetectionSystem,
                    IntrusionPreventionSystem: Input.IntrusionPreventionSystem,
                    VirtualPrivateNetworkSupport: Input.VirtualPrivateNetworkSupport,
                    DeviceControl: DropDownData.SecureNetworkArchitecture?.value,
                }
            };
        }
        // Check if user has ThreatIntelligence category
        if (userCategories.includes('ThreatIntelligence')) {
            updatedSettings = {
                ...updatedSettings,
                ThreatIntelligence: {
                    RealTimeAnalysis: Input.RealTimeAnalysis,
                    ThreatHuntingCapability: Input.ThreatHuntingCapability,
                    ThreatSharingCapability: Input.ThreatSharingCapability,
                }
            };
        }
        // Check if user has SecurityAwarenessTraining category
        if (userCategories.includes('SecurityAwarenessTraining')) {
            updatedSettings = {
                ...updatedSettings,
                SecurityAwarenessTraining: {
                    PhishingSimulations: Input.PhishingSimulations,
                    CustomizableCourseContent: Input.CustomizableCourseContent,
                    RegularlyUpdatedMaterial: Input.RegularlyUpdatedMaterial,
                    ReportingAnalytics: Input.ReportingAnalytics,
                }
            };
        }
        // Check if user has IncidentResponse category
        if (userCategories.includes('IncidentResponse')) {
            updatedSettings = {
                ...updatedSettings,
                IncidentResponse: {
                    ForensicCapabilities: Input.ForensicCapabilities,
                    AutomatedResponse: Input.AutomatedResponse,
                    PlaybookIntegration: Input.PlaybookIntegration,
                    PostIncidentAnalysis: Input.PostIncidentAnalysis,
                }
            };
        }
        // Check if user has IotSecurity category
        if (userCategories.includes('IotSecurity')) {
            updatedSettings = {
                ...updatedSettings,
                IotSecurity: {
                    DeviceAuthentication: Input.DeviceAuthentication,
                    FirmwareUpdates: Input.FirmwareUpdates,
                    AnomalyDetection: Input.AnomalyDetection,
                    DeviceInventoryManagement: Input.DeviceInventoryManagement,
                }
            };
        }
        // Check if user has EmailSecurity category
        if (userCategories.includes('EmailSecurity')) {
            updatedSettings = {
                ...updatedSettings,
                EmailSecurity: {
                    PhishingProtection: Input.PhishingProtection,
                    DataLossPreventionDLP: Input.DataLossPreventionDLP,
                    EmailEncryption: Input.EmailEncryption,
                    SandboxAnalysis: Input.SandboxAnalysis,
                }
            };
        }
        // Check if user has SIEM category
        if (userCategories.includes('SIEM')) {
            updatedSettings = {
                ...updatedSettings,
                SIEM: {
                    LogCollection: Input.LogCollection,
                    EventCorrelation: Input.EventCorrelation,
                    RealTimeAlertingSIEM: Input.RealTimeAlertingSIEM,
                    HistoricalAnalysis: Input.HistoricalAnalysis,
                }
            };
        }
        // Check if user has DDOSProtection category
        if (userCategories.includes('DDOSProtection')) {
            updatedSettings = {
                ...updatedSettings,
                DDOSProtection: {
                    TrafficAnalysis: Input.TrafficAnalysis,
                    CloudBasedMitigation: Input.CloudBasedMitigation,
                    RateLimiting: Input.RateLimiting,
                    ApplicationLayerProtection: Input.ApplicationLayerProtection,
                }
            };
        }
        // Check if user has MobileSecurity category
        if (userCategories.includes('MobileSecurity')) {
            updatedSettings = {
                ...updatedSettings,
                MobileSecurity: {
                    MobileDeviceManagement: Input.MobileDeviceManagement,
                    MobileApplicationManagement: Input.MobileApplicationManagement,
                    ThreatProtection: Input.ThreatProtection,
                    DataLeakPrevention: Input.DataLeakPrevention,
                }
            };
        }
        // Check if user has Blockchain category
        if (userCategories.includes('Blockchain')) {
            updatedSettings = {
                ...updatedSettings,
                Blockchain: {
                    SupportedProtocols: DropDownData.SupportedProtocols?.value,
                    ConsensusAlgorithms: DropDownData.ConsensusAlgorithms?.value,
                    SmartContractVerification: Input.SmartContractVerification,
                    Interoperability: Input.Interoperability,
                }
            };
        }
        // Check if user has WebSecurity category
        if (userCategories.includes('WebSecurity')) {
            updatedSettings = {
                ...updatedSettings,
                WebSecurity: {
                    ContentFiltering: Input.ContentFiltering,
                    BrowserIsolation: Input.BrowserIsolation,
                    SSLInspection: Input.SSLInspection,
                    MalwareScanning: Input.MalwareScanning,
                }
            };
        }
        // Check if user has IdentityManagement category
        if (userCategories.includes('IdentityManagement')) {
            updatedSettings = {
                ...updatedSettings,
                IdentityManagement: {
                    AuthenticationProtocols: DropDownData.AuthenticationProtocols?.value,
                    MultiFactorAuthentication: Input.MultiFactorAuthentication,
                    RoleBasedAccessControl: Input.RoleBasedAccessControl,
                    UserLifecycleManagement: Input.UserLifecycleManagement,
                }
            };
        }
        // Check if user has PrivilegedAccessManagement category
        if (userCategories.includes('PrivilegedAccessManagement')) {
            updatedSettings = {
                ...updatedSettings,
                PrivilegedAccessManagement: {
                    SessionMonitoring: Input.SessionMonitoring,
                    PasswordVaulting: Input.PasswordVaulting,
                    PrivilegeDelegation: Input.PrivilegeDelegation,
                    TimeLimitedAccess: Input.TimeLimitedAccess,
                }
            };
        }
        // Check if user has CloudSecurity category
        if (userCategories.includes('CloudSecurity')) {
            updatedSettings = {
                ...updatedSettings,
                CloudSecurity: {
                    DataResidency: DropDownData.DataResidency?.value,
                    CloudConfigurationManagement: Input.CloudConfigurationManagement,
                    VirtualPrivateCloudConfigurations: Input.VirtualPrivateCloudConfigurations,
                    APISecurity: Input.APISecurity,
                }
            };
        }
        // Check if user has SecurityOperations category
        if (userCategories.includes('SecurityOperations')) {
            updatedSettings = {
                ...updatedSettings,
                SecurityOperations: {
                    ThreatHunting: Input.ThreatHunting,
                    RealTimeAlerting: Input.RealTimeAlerting,
                    SecurityOrchestration: Input.SecurityOrchestration,
                }
            };
        }
        // Check if user has ApplicationSecurity category
        if (userCategories.includes('ApplicationSecurity')) {
            updatedSettings = {
                ...updatedSettings,
                ApplicationSecurity: {
                    StaticTestingSAST: Input.StaticTestingSAST,
                    DynamicTestingDAST: Input.DynamicTestingDAST,
                    RuntimeProtectionRASP: Input.RuntimeProtectionRASP,
                    WebApplicationFirewallsWAF: Input.WebApplicationFirewallsWAF,
                }
            };
        }



        const sendUpdatedSettings = { service_specs: updatedSettings }
        const response: ApiResponse = await updateVendorSetting({ sendUpdatedSettings, accessToken: token })
        if (response.error && response.error.status === 500) {
            setLoading(false);
            return toast.error("Server is busy", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        }
        if (response.error && response.error.status === 404) {
            setLoading(false);
            return toast.error("Invalid ID", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true });
        }
        setLoading(false);
        toast.success("Setting Update Success.", { position: toast.POSITION.BOTTOM_RIGHT, hideProgressBar: true })
        refetch();
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setInput(prevState => ({ ...prevState, [name]: checked }));
    };


    return (
        <section className="flex justify-center items-start flex-col gap-4">
            {/* ... (dummyData rendering) */}
            <h2 className="text-[18px] text-brand-primary mt-4">  The following information is used to help Konnector’s better understand your product/service:</h2>
            <div className="w-full flex justify-center items-start flex-col">

                {isLoading ?
                    <div className='w-full h-[80vh] flex items-center justify-center'>
                        <RingLoader color={"#07689F"} loading={true} size={50} />
                    </div> :
                    <div className="w-full grid grid-cols-2 gap-4">
                        {userCategories.includes('DataProtection') && (
                            <div>
                                <div>
                                    <h6 className="text-[22px] font-semibold mt-12">Data Protection:</h6>
                                    <div className='w-[60%]'>
                                        <SelectDropDown
                                            selectedOption={DropDownData.EncryptionStandards}
                                            setSelectedOption={(option) => setDropDownData({ ...DropDownData, EncryptionStandards: option })}
                                            dropdownItems={EncryptionStandardsOptions}
                                            label={"Encryption Standards"}
                                            menuHeight={"200px"}
                                            backgroundColor="#ffffff"
                                            required
                                        />
                                        <SelectDropDown selectedOption={DropDownData.DataBackupMethods}
                                            setSelectedOption={(option) => setDropDownData({ ...DropDownData, DataBackupMethods: option })}
                                            dropdownItems={backupOptions} label={"Data Backup Methods"}
                                            required menuHeight={"200px"} backgroundColor="#ffffff"
                                        />
                                    </div>

                                    <div className="w-[100%] flex flex-col gap-2">
                                        <CheckBox label='Data Masking' value="DataMasking" checked={Input.DataMasking} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                        <CheckBox label='Tokenization' value="Tokenization" checked={Input.Tokenization} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Data Access Governance  */}
                        {userCategories.includes('DataAccessGovernance') && (
                            <div>
                                < h6 className="text-[22px] font-semibold mt-12">Data Access Governance: </ h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Permission Management' value="PermissionManagement" checked={Input.PermissionManagement} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Audit Activity Logs' value="AuditActivityLogs" checked={Input.AuditActivityLogs} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Unstructured Data Governance' value="UnstructuredDataGovernance" checked={Input.UnstructuredDataGovernance} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Regular Access Reviews' value="RegularAccessReviews" checked={Input.RegularAccessReviews} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* Access Governance  */}
                        {userCategories.includes('AccessGovernanse') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Access Governance:</h6>
                                <div className="w-[100%] flex flex-col ">
                                    <div className='w-[100%] flex flex-col gap-2'>
                                        <CheckBox label='Access Request Workflows' value="AccessRequestWorkflows" checked={Input.AccessRequestWorkflows} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                        <CheckBox label='Compliance Reporting' value="ComplianceReporting" checked={Input.ComplianceReporting} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                        <CheckBox label='Segregation Of Duties' value="SegregationOfDuties" checked={Input.SegregationOfDuties} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                        <CheckBox label='Recertification Cycles' value="RecertificationCycles" checked={Input.RecertificationCycles} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Foundational Security  */}
                        {userCategories.includes('FoundationalSecurity') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Foundational Security:</h6>
                                <div className="w-[100%] flex flex-col ">
                                    <div className='w-[60%]'>
                                        <SelectDropDown selectedOption={DropDownData.FirewallTypes}
                                            setSelectedOption={(option) => setDropDownData({ ...DropDownData, FirewallTypes: option })}
                                            dropdownItems={FirewallTypesOptions} label={"Firewall Types"}
                                            required menuHeight={"200px"} backgroundColor="#ffffff"
                                        />
                                    </div>
                                    <div className='w-[100%] flex flex-col gap-2'>
                                        <CheckBox label='Antivirus' value="Antivirus" checked={Input.Antivirus} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                        <CheckBox label='Patch Update Management' value="PatchUpdateManagement" checked={Input.PatchUpdateManagement} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                        <CheckBox label='IDS' value="IDS" checked={Input.IDS} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Risk & Compliance  */}
                        {userCategories.includes('RiskCompliance') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Risk & Compliance:</h6>
                                <div className="w-[100%] flex flex-col ">
                                    <div className='w-[60%]'>
                                        <SelectDropDown selectedOption={DropDownData.ComplianceTemplates}
                                            setSelectedOption={(option) => setDropDownData({ ...DropDownData, ComplianceTemplates: option })}
                                            dropdownItems={ComplianceTemplatesOptions} label={"Compliance Templates"}
                                            required menuHeight={"200px"} backgroundColor="#ffffff"
                                        />
                                    </div>
                                    <div className='w-[100%] flex flex-col gap-2'>
                                        <CheckBox label='Risk Assessment Tools' value="RiskAssessmentTools" checked={Input.RiskAssessmentTools} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                        <CheckBox label='Policy Management' value="PolicyManagement" checked={Input.PolicyManagement} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                        <CheckBox label='Continuous Monitoring' value="ContinuousMonitoring" checked={Input.ContinuousMonitoring} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Endpoint Security  */}
                        {userCategories.includes('EndpointSecurity') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Endpoint Security:</h6>
                                <div className='w-[60%]'>
                                    <SelectDropDown selectedOption={DropDownData.DeviceControl}
                                        setSelectedOption={(option) => setDropDownData({ ...DropDownData, DeviceControl: option })}
                                        dropdownItems={DeviceControlOptions} label={"Device Control"}
                                        required menuHeight={"200px"} backgroundColor="#ffffff"
                                    />
                                </div>
                                <div className='w-[100%] flex flex-col gap-2'>
                                    <CheckBox label='Malware Detection' value="MalwareDetection" checked={Input.MalwareDetection} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Host Based Intrusion Prevention' value="HostBasedIntrusionPrevention" checked={Input.HostBasedIntrusionPrevention} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Offline Protection' value="OfflineProtection" checked={Input.OfflineProtection} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* Network Security  */}
                        {userCategories.includes('NetworkSecurity') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Network Security:</h6>
                                <div className='w-[60%]'>
                                    <SelectDropDown selectedOption={DropDownData.SecureNetworkArchitecture}
                                        setSelectedOption={(option) => setDropDownData({ ...DropDownData, SecureNetworkArchitecture: option })}
                                        dropdownItems={networkArchitectureOptions} label={"Secure Network Architecture"}
                                        required menuHeight={"200px"} backgroundColor="#ffffff"
                                    />
                                </div>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Intrusion Detection System' value="IntrusionDetectionSystem" checked={Input.IntrusionDetectionSystem} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Intrusion Prevention System' value="IntrusionPreventionSystem" checked={Input.IntrusionPreventionSystem} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Virtual Private Network Support' value="VirtualPrivateNetworkSupport" checked={Input.VirtualPrivateNetworkSupport} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* Threat Intelligence  */}
                        {userCategories.includes('ThreatIntelligence') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Threat Intelligence:</h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='RealTime Analysis' value="RealTimeAnalysis" checked={Input.RealTimeAnalysis} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Threat Hunting Capability' value="ThreatHuntingCapability" checked={Input.ThreatHuntingCapability} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Threat Sharing Capability' value="ThreatSharingCapability" checked={Input.ThreatSharingCapability} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* Security Awareness Training  */}
                        {userCategories.includes('SecurityAwarenessTraining') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Security Awareness Training:</h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Phishing Simulations' value="PhishingSimulations" checked={Input.PhishingSimulations} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='CustomizableCourse Content' value="CustomizableCourseContent" checked={Input.CustomizableCourseContent} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Regularly Updated Material' value="RegularlyUpdatedMaterial" checked={Input.RegularlyUpdatedMaterial} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Reporting Analytics' value="ReportingAnalytics" checked={Input.ReportingAnalytics} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* Incident Response  */}
                        {userCategories.includes('IncidentResponse') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Incident Response:</h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Forensic Capabilities' value="ForensicCapabilities" checked={Input.ForensicCapabilities} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Automated Response' value="AutomatedResponse" checked={Input.AutomatedResponse} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Play Book Integration' value="PlaybookIntegration" checked={Input.PlaybookIntegration} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Post Incident Analysis' value="PostIncidentAnalysis" checked={Input.PostIncidentAnalysis} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* IoT Security  */}
                        {userCategories.includes('IotSecurity') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">IoT Security:</h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Device Authentication' value="DeviceAuthentication" checked={Input.DeviceAuthentication} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Firmware Updates' value="FirmwareUpdates" checked={Input.FirmwareUpdates} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Anomaly Detection' value="AnomalyDetection" checked={Input.AnomalyDetection} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Device Inventory Management' value="DeviceInventoryManagement" checked={Input.DeviceInventoryManagement} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}

                        {/* Email Security  */}
                        {userCategories.includes('EmailSecurity') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Email Security:</h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Phishing Protection' value="PhishingProtection" checked={Input.PhishingProtection} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Data Loss Prevention' value="DataLossPreventionDLP" checked={Input.DataLossPreventionDLP} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Email Encryption' value="EmailEncryption" checked={Input.EmailEncryption} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Sandbox Analysis' value="SandboxAnalysis" checked={Input.SandboxAnalysis} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}

                        {/* Security Information and Event Management (SIEM) */}
                        {userCategories.includes('SIEM') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Security Information and Event Management:</h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Log Collection' value="LogCollection" checked={Input.LogCollection} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Event Correlation' value="EventCorrelation" checked={Input.EventCorrelation} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='RealTime Alerting' value="RealTimeAlertingSIEM" checked={Input.RealTimeAlertingSIEM} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Historical Analysis' value="HistoricalAnalysis" checked={Input.HistoricalAnalysis} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* DDoS Protection */}
                        {userCategories.includes('DDOSProtection') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">DDoS Protection:</h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Traffic Analysis' value="TrafficAnalysis" checked={Input.TrafficAnalysis} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Cloud Based Mitigation' value="CloudBasedMitigation" checked={Input.CloudBasedMitigation} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Rate Limiting' value="RateLimiting" checked={Input.RateLimiting} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Application Layer Protection' value="ApplicationLayerProtection" checked={Input.ApplicationLayerProtection} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/*  Mobile Security  */}
                        {userCategories.includes('MobileSecurity') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Mobile Security:</h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Mobile Device Management' value="MobileDeviceManagement" checked={Input.MobileDeviceManagement} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Mobile Application Management' value="MobileApplicationManagement" checked={Input.MobileApplicationManagement} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Threat Protection' value="ThreatProtection" checked={Input.ThreatProtection} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Data Leak Prevention' value="DataLeakPrevention" checked={Input.DataLeakPrevention} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* Blockchain */}
                        {userCategories.includes('Blockchain') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Blockchain:</h6>
                                <div className='w-[60%]'>
                                    <SelectDropDown selectedOption={DropDownData.SupportedProtocols}
                                        setSelectedOption={(option) => setDropDownData({ ...DropDownData, SupportedProtocols: option })}
                                        dropdownItems={SupportedProtocolsOptions} label={"Supported Protocols"}
                                        required menuHeight={"200px"} backgroundColor="#ffffff"
                                    />
                                    <SelectDropDown selectedOption={DropDownData.ConsensusAlgorithms}
                                        setSelectedOption={(option) => setDropDownData({ ...DropDownData, ConsensusAlgorithms: option })}
                                        dropdownItems={ConsensusAlgorithmsOptions} label={"Consensus Algorithms"}
                                        required menuHeight={"200px"} backgroundColor="#ffffff"
                                    />
                                </div>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Smart Contract Verification' value="SmartContractVerification" checked={Input.SmartContractVerification} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Interoperability' value="Interoperability" checked={Input.Interoperability} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* Web Security */}
                        {userCategories.includes('WebSecurity') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Web Security:</h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Content Filtering' value="ContentFiltering" checked={Input.ContentFiltering} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Browser Isolation' value="BrowserIsolation" checked={Input.BrowserIsolation} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='SSL Inspection' value="SSLInspection" checked={Input.SSLInspection} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Malware Scanning' value="MalwareScanning" checked={Input.MalwareScanning} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* Identity Management 1 */}
                        {userCategories.includes('IdentityManagement') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Identity Management:</h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='MultiFactor Authentication' value="MultiFactorAuthentication" checked={Input.MultiFactorAuthentication} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Role Based Access Control' value="RoleBasedAccessControl" checked={Input.RoleBasedAccessControl} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='User Lifecycle Management' value="UserLifecycleManagement" checked={Input.UserLifecycleManagement} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* Privileged Access Management 2 */}
                        {userCategories.includes('PrivilegedAccessManagement') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Privileged Access Management:</h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Session Monitoring' value="SessionMonitoring" checked={Input.SessionMonitoring} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Password Vaulting' value="PasswordVaulting" checked={Input.PasswordVaulting} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Privilege Delegation' value="PrivilegeDelegation" checked={Input.PrivilegeDelegation} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Time Limited Access' value="TimeLimitedAccess" checked={Input.TimeLimitedAccess} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* Cloud Security 3 */}
                        {userCategories.includes('CloudSecurity') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Cloud Security:</h6>
                                <div className="w-[60%] flex flex-col ">
                                    <SelectDropDown selectedOption={DropDownData.DataResidency}
                                        setSelectedOption={(option) => setDropDownData({ ...DropDownData, DataResidency: option })}
                                        dropdownItems={DataResidencyOptions} label={"Data Residency"}
                                        required menuHeight={"200px"} backgroundColor="#ffffff"
                                    />
                                </div>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Cloud Configuration Management' value="CloudConfigurationManagement" checked={Input.CloudConfigurationManagement} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Virtual Private Cloud Configurations' value="VirtualPrivateCloudConfigurations" checked={Input.VirtualPrivateCloudConfigurations} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='API Security' value="APISecurity" checked={Input.APISecurity} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* Security Operations 4 */}
                        {userCategories.includes('SecurityOperations') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Security Operations:</h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Threat Hunting' value="ThreatHunting" checked={Input.ThreatHunting} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='RealTime Alerting' value="RealTimeAlerting" checked={Input.RealTimeAlerting} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Security Orchestration' value="SecurityOrchestration" checked={Input.SecurityOrchestration} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                        {/* Application Security 5 */}
                        {userCategories.includes('ApplicationSecurity') && (
                            <div>
                                <h6 className="text-[22px] font-semibold mt-12">Application Security:</h6>
                                <div className="w-[100%] flex flex-col gap-2">
                                    <CheckBox label='Static Testing ' value="StaticTestingSAST" checked={Input.StaticTestingSAST} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Dynamic Testing ' value="DynamicTestingDAST" checked={Input.DynamicTestingDAST} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Runtime Protection ' value="RuntimeProtectionRASP" checked={Input.RuntimeProtectionRASP} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                    <CheckBox label='Web Application Firewalls' value="WebApplicationFirewallsWAF" checked={Input.WebApplicationFirewallsWAF} onCheck={handleCheckboxChange} styles="text-brand-primary text-[16px] font-medium ml-2 mt-[-2px] cursor-pointer " />
                                </div>
                            </div>
                        )}
                    </div>
                }
                <div className="w-full mt-4">
                    <Button text="Save" disabled={Loading} icon={!Loading ? <BsArrowRight className="text-2xl text-white-600 rounded-full" /> : <RingLoader color={"#FFFFFF"} loading={true} size={30} />} type="submit" onClick={updateUserSettings} style="bg-brand-primary text-[14px] h-[40px] mx-auto mt-4" />
                </div>
            </div>
        </section >
    )
}

export default VendorSetting
