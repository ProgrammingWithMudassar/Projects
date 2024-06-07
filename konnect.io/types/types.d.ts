import { string } from "yup";

export interface ILogin {
    email: string | number,
    password: string | number
}

export interface ISettings {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    company: string,
    HQLocation: string,
    companyEmail: string,
    recoveryEmail: string,
    bio: string;
    password: string;
    rPassword: string;
    currentPassword: string;
    creditCardName: string;
    cardType: string;
    cardNo: string;
    expDate: string
}

export interface ISettingsTabs {
    personal: boolean;
    password: boolean;
    creditCard?: boolean;
    socialMedia: boolean
}

export interface BillingInformation {
    FirstName: string;
    LastName: string;
    CardName: string;
    CardType: string;
    CardNumber: string;
    CardExpDate: string;
    CVV: string;
}

export interface ViaInformation {
    CardNumber: string;
    CardExpDate: string;
    PostCode: string;
    CVV: string;
}

export interface UserFilter {
    first_name: string;
    last_name: string;
    email: string;
    country1: { value: string, label: string } | null,
    state1: { value: string, label: string } | null,
    city1: { value: string, label: string } | null,

    country2: { value: string, label: string } | null,
    state2: { value: string, label: string } | null,
    city2: { value: string, label: string } | null,

    country3: { value: string, label: string } | null,
    state3: { value: string, label: string } | null,
    city3: { value: string, label: string } | null,

    password: string;
    cpassword: string;
    user_type: string;
}


export interface VendorRegister {
    CompanyName: string;
    Summary: string;
    country: { value: string, label: string } | null;
    state: { value: string, label: string } | null;
    city: { value: string, label: string } | null;
    categories: any;
    LinkedInURL: string;
    WebsiteURL: string;
    companyLogo: any;
    whitePaper: File | undefined;
}

export interface CustomerRegister {
    CompanyName: string;
    Summary: string;
    HQLocation: string;
    LinkedInURL: string;
    WebsiteURL: string;
    companyLogo: File | undefined;
    whitePaper: File | undefined;
}

export interface IKonnectStatus {
    activeProject: boolean;
    moreInformation: boolean;
    exploring: boolean
}

export interface ForgetPassword {
    email: string;
    newPassword: string;
    confirmPassword: string;
}

export interface KonnectorRegister {
    FirstName: string;
    LastName: string;
    CompanyEmail: string;
    CompanySize: string;
    Phone: string;
    Password: string;
    rPassword: string;
}

export interface KonnectID {
    konnectID: string;
}
export interface EmailVerify {
    email: string;
}

export interface NewPassword {
    NewPassword: string;
    ConfirmPassword: string;
}


export interface CreditCardInputs {
    CreditCardName: string;
    CardType: string;
    CardNo: string;
    ExpDate: string;
    CardType: string;
}

export interface PersonalInformation {
    FirstName: string;
    LastName: string;
    Phone: string;
    CompanyName: string;
    country: { value: string, label: string } | null,
    state: { value: string, label: string } | null,
    city: { value: string, label: string } | null,
    CompanyEmail: string;
    RecoveryEmail: string;
    Bio: string;
}


type konnectorPasswordData = {
    current_password: string;
    new_password: string;
    rpassword: string;
};
export interface SettingFormValues {
    IntrusionDetectionSystem: boolean,
    IntrusionPreventionSystem: boolean,
    VirtualPrivateNetworkSupport: boolean,
    IDS:boolean,
    PatchUpdateManagement:boolean;
    Antivirus:boolean;
    DataMasking: boolean;
    Tokenization: boolean;
    PermissionManagement: boolean;
    AuditActivityLogs: boolean;
    UnstructuredDataGovernance: boolean;
    RegularAccessReviews: boolean;
    AccessRequestWorkflows: boolean;
    SegregationOfDuties: boolean;
    RecertificationCycles: boolean;
    ComplianceReporting: boolean;
    RiskAssessmentTools: boolean;
    PolicyManagement: boolean;
    ContinuousMonitoring: boolean;
    MalwareDetection: boolean;
    HostBasedIntrusionPrevention: boolean;
    OfflineProtection: boolean;
    RealTimeAnalysis: boolean;
    ThreatHuntingCapability: boolean;
    ThreatSharingCapability: boolean;
    PhishingSimulations: boolean;
    CustomizableCourseContent: boolean;
    RegularlyUpdatedMaterial: boolean;
    ReportingAnalytics: boolean;
    ForensicCapabilities: boolean;
    AutomatedResponse: boolean;
    PlaybookIntegration: boolean;
    PostIncidentAnalysis: boolean;
    DeviceAuthentication: boolean;
    FirmwareUpdates: boolean;
    AnomalyDetection: boolean;
    DeviceInventoryManagement: boolean;
    PhishingProtection: boolean;
    DataLossPreventionDLP: boolean;
    EmailEncryption: boolean;
    SandboxAnalysis: boolean;
    LogCollection: boolean;
    EventCorrelation: boolean;
    RealTimeAlertingSIEM: boolean;
    HistoricalAnalysis: boolean;
    TrafficAnalysis: boolean;
    CloudBasedMitigation: boolean;
    RateLimiting: boolean;
    ApplicationLayerProtection: boolean;
    MobileDeviceManagement: boolean;
    MobileApplicationManagement: boolean;
    ThreatProtection: boolean;
    DataLeakPrevention: boolean;
    SmartContractVerification: boolean;
    Interoperability: boolean;
    ContentFiltering: boolean;
    BrowserIsolation: boolean;
    SSLInspection: boolean;
    MalwareScanning: boolean;
    MultiFactorAuthentication: boolean;
    RoleBasedAccessControl: boolean;
    UserLifecycleManagement: boolean;
    SessionMonitoring: boolean;
    PasswordVaulting: boolean;
    PrivilegeDelegation: boolean;
    TimeLimitedAccess: boolean;
    CloudConfigurationManagement: boolean;
    APISecurity: boolean;
    VirtualPrivateCloudConfigurations: boolean;
    ThreatHunting: boolean;
    RealTimeAlerting: boolean;
    SecurityOrchestration: boolean;
    StaticTestingSAST: boolean;
    DynamicTestingDAST: boolean;
    RuntimeProtectionRASP: boolean;
    WebApplicationFirewallsWAF: boolean;
}

export interface SettingDropDownValues {
    DataBackupMethods: { value: string, label: string } | null;
    EncryptionStandards: { value: string, label: string } | null;
    AuthenticationProtocols: { value: string, label: string } | null;
    DataResidency: { value: string, label: string } | null;
    FirewallTypes: { value: string, label: string } | null;
    ComplianceTemplates: { value: string, label: string } | null;
    SupportedProtocols: { value: string, label: string } | null;
    DeviceControl: { value: string, label: string } | null;
    SecureNetworkArchitecture: { value: string, label: string } | null;
    ConsensusAlgorithms: { value: string, label: string } | null;
}

export interface IRating {
    communication: number;
    service: number;
    support: number;
}

export interface IMessages {
    conceal: boolean;
    id: string;
    interaction_type: string;
    message: Array<{
        messageText: string;
        timestamp: FieldValue;
        isUser: boolean;
        media: null;
    }>;
    user_company: string;
    user_first_name:  string;
    user_last_name:  string;
    user_id: number;
    user_profile_icon: string;
    vendor_company: string;
    vendor_id: number;
    vendor_profile_icon: string;
    internal_id: number
}

export interface Option {
    value: string;
    label: string;
}

export interface IKonnectorRegister {
    first_name: string,
    last_name: string,
    email: string,
    company_name: string,
    company_size: { value: string, label: string } | null,
    country: { value: string, label: string } | null,
    state: { value: string, label: string } | null,
    city: { value: string, label: string } | null,
    categories: any,
    phone_no: string,
    password: string,
    cPassword?: string,
}

export interface ITogglePassword {
    password: boolean;
    cPassword: boolean;
}

export interface STogglePassword {
    Ppassword: boolean;
    password: boolean;
    cPassword: boolean;
}

export interface IVendorsData {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    vendors: Array<any>
}

type IMessage = {
    messageText: string,
    timestamp: string,
    isUser: boolean
}

type IContactList = {
    user_id: string | number,
    user_profile_icon: string,
    vendor_id: string | number,
    vendor_profile_icon: string,
    interaction_type: string
    conceal: boolean
    message: Array<IMessage>
}