export const EncryptionStandardsOptions = [
    { value: "AES", label: "AES" },
    { value: "RSA", label: "RSA" },
    { value: "DES", label: "DES" },
    { value: "3DES", label: "3DES" },
    { value: "Blowfish", label: "Blowfish" },
    { value: "Twofish", label: "Twofish" },
    { value: "ECC", label: "ECC" },
    { value: "DSA", label: "DSA" },
    { value: "DiffieHellman", label: "Diffie-hellman Key Exchange" },
    { value: "RC4", label: "RC4" },
    { value: "ChaCha20", label: "ChaCha20" },
    { value: "Camellia", label: "Camellia" },
    { value: "Serpent", label: "Serpent" },
    { value: "IDEA", label: "IDEA" },
    { value: "GCM", label: "GCM" },
    { value: "HMAC", label: "HMAC" },
    { value: "SSL/TLS", label: "SSL/TLS" },
    { value: "WPA/WPA2/WPA3", label: "WPA/WPA2/WPA3" },
    { value: "Ipsec", label: "Ipsec" },
    { value: "PGP", label: "PGP" },
    { value: "SSH", label: "SSH" },
    { value: "VPN", label: "VPN" }
];

export const backupOptions = [
    { value: "Incremental", label: "Incremental" },
    { value: "Full", label: "Full" },
    { value: "Differential", label: "Differential" }
];

export const DataResidencyOptions = [
    { value: "Local", label: "Local" },
    { value: "Regional", label: "Regional" },
    { value: "Global", label: "Global" }
];

export const AuthenticationProtocolsOptions = [
    { value: "OAuth", label: "OAuth" },
    { value: "SAML", label: "SAML" },
    { value: "OpenID Connect", label: "OpenID Connect" },
    { value: "Kerberos", label: "Kerberos" },
    { value: "LDAP", label: "LDAP" },
    { value: "RADIUS", label: "RADIUS" },
    { value: "TACACS+", label: "TACACS+" },
    { value: "JWT", label: "JWT" },
    { value: "Digest Authentication", label: "Digest Authentication" },
    { value: "Client Certificate Authentication", label: "Client Certificate Authentication" },
    { value: "Smart Card", label: "Smart Card" },
    { value: "Biometric", label: "Biometric" },
    { value: "OTP", label: "OTP" },
    { value: "FIDO", label: "FIDO" },
    { value: "Windows Auth. Protocols", label: "Windows Auth. Protocols" },
    { value: "OAuth 2.0 Flows", label: "OAuth 2.0 Flows" },
    { value: "Zero Trust Architecture", label: "Zero Trust Architecture" },
    { value: "MFA", label: "MFA" }
];

export const FirewallTypesOptions = [
    { value: "Network", label: "Network" },
    { value: "Host-based", label: "Host-based" },
    { value: "Application Layer", label: "Application Layer" },
    { value: "Stateful", label: "Stateful" },
    { value: "NGFW", label: "NGFW (Next-Generation Firewall)" },
    { value: "Proxy", label: "Proxy" },
    { value: "Packet Filtering", label: "Packet Filtering" },
    { value: "DPI", label: "DPI (Deep Packet Inspection)" },
    { value: "Cloud", label: "Cloud" },
    { value: "IDS & IPS", label: "IDS & IPS (Intrusion Detection System & Intrusion Prevention System)" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "WAF", label: "WAF (Web Application Firewall)" },
    { value: "Personal", label: "Personal" },
    { value: "Virtual", label: "Virtual" },
    { value: "IoT", label: "IoT (Internet of Things)" },
    { value: "Perimeter", label: "Perimeter" },
    { value: "FWaaS", label: "FWaaS (Firewall as a Service)" },
    { value: "DAST", label: "DAST (Dynamic Application Security Testing)" }
];

export const ComplianceTemplatesOptions = [
    { value: "GDPR", label: "GDPR" },
    { value: "CCPA", label: "CCPA" },
    { value: "HIPAA", label: "HIPAA" },
    { value: "PCI DSS", label: "PCI DSS" },
    { value: "ISO 27001", label: "ISO 27001" },
    { value: "NIST Cybersecurity Framework", label: "NIST Cybersecurity Framework" },
    { value: "FISMA", label: "FISMA" },
    { value: "FERPA", label: "FERPA" },
    { value: "SOX", label: "SOX" },
    { value: "GLBA", label: "GLBA" },
    { value: "CIS Controls", label: "CIS Controls" },
    { value: "CSA STAR Cert.", label: "CSA STAR Certification" },
    { value: "FERC", label: "FERC" },
    { value: "GDPL", label: "GDPL" },
    { value: "PDPA", label: "PDPA" },
    { value: "LGPD", label: "LGPD" },
    { value: "APEC", label: "APEC" },
    { value: "FERMA", label: "FERMA" },
    { value: "ITAR", label: "ITAR" },
    { value: "CMMC", label: "CMMC" },
    { value: "ISO 9001", label: "ISO 9001" },
    { value: "ISO 14001", label: "ISO 14001" }
];

export const SupportedProtocolsOptions = [
    { value: "Ethereum", label: "Ethereum" },
    { value: "Hyperledger", label: "Hyperledger" },
    { value: "Corda", label: "Corda" },
    { value: "Stellar", label: "Stellar" },
    { value: "EOSIO", label: "EOSIO" },
    { value: "Tezos", label: "Tezos" },
    { value: "Avalanche", label: "Avalanche" },
    { value: "Algorand", label: "Algorand" },
    { value: "NEM", label: "NEM" },
    { value: "Cardano", label: "Cardano" },
    { value: "Quorum", label: "Quorum" },
    { value: "Hashgraph", label: "Hashgraph" },
    { value: "IOTA", label: "IOTA" },
    { value: "VeChain", label: "VeChain" },
    { value: "Ripple", label: "Ripple" },
    { value: "BSC", label: "Binance Smart Chain (BSC)" },
    { value: "Polkadot", label: "Polkadot" },
    { value: "Solana", label: "Solana" },
    { value: "Flow", label: "Flow" },
    { value: "Cosmos", label: "Cosmos" },
    { value: "Zilliqa", label: "Zilliqa" },
    { value: "TRON", label: "TRON" }
];

export const ConsensusAlgorithmsOptions = [
    { value: "PoW", label: "Proof of Work (PoW)" },
    { value: "PoS", label: "Proof of Stake (PoS)" },
    { value: "DpoS", label: "Delegated Proof of Stake (DPoS)" },
    { value: "PoA", label: "Proof of Authority (PoA)" },
    { value: "PoSpace", label: "Proof of Space (PoSpace)" },
    { value: "PoET", label: "Proof of Elapsed Time (PoET)" },
    { value: "PBFT", label: "Practical Byzantine Fault Tolerance (PBFT)" },
    { value: "HoneyBadgerBFT", label: "HoneyBadgerBFT" },
    { value: "SBFT", label: "Simplified Byzantine Fault Tolerance (SBFT)" },
    { value: "RPCA", label: "Reputation Proof of Consensus Algorithm (RPCA)" },
    { value: "Stake Delegation", label: "Stake Delegation" },
    { value: "PoH", label: "Proof of History (PoH)" },
    { value: "Avalanche Consensus", label: "Avalanche Consensus" },
    { value: "PoST", label: "Proof of SpaceTime (PoST)" },
    { value: "Proof of Activity", label: "Proof of Activity" },
    { value: "PoWeight", label: "Proof of Weight (PoWeight)" },
    { value: "DAG Consensus", label: "Directed Acyclic Graph (DAG) Consensus" },
    { value: "PoA & PoS Hybrid", label: "Proof of Authority and Proof of Stake Hybrid" },
    { value: "Proof of Knowledge", label: "Proof of Knowledge" },
    { value: "LPoS", label: "Leased Proof of Stake (LPoS)" },
    { value: "PoSTT", label: "Proof of SpaceTime and Transaction (PoSTT)" },
    { value: "Permissioned Consensus", label: "Permissioned Consensus" }
];

export const DeviceControlOptions = [
    { value: "USB block", label: "USB Block" },
    { value: "Bluetooth control", label: "Bluetooth Control" },
    { value: "Peripheral Port Control", label: "Peripheral Port Control" },
    { value: "Camera Control", label: "Camera Control" },
    { value: "Microphone Control", label: "Microphone Control" },
    { value: "Wi-Fi Control", label: "Wi-Fi Control" },
    { value: "GPS Control", label: "GPS Control" },
    { value: "NFC Control", label: "NFC Control" },
    { value: "Biometric Sensor", label: "Biometric Sensor Control" },
    { value: "Smart Card Reader", label: "Smart Card Reader Control" },
    { value: "Sensor Control", label: "Sensor Control" },
    { value: "Power Management", label: "Power Management Control" },
    { value: "Peripheral Device Locking", label: "Peripheral Device Locking Control" },
    { value: "Device Whitelisting/Blacklisting", label: "Device Whitelisting/Blacklisting Control" },
    { value: "Device Encryption", label: "Device Encryption Control" },
    { value: "Serial Port Control", label: "Serial Port Control" },
    { value: "Display Output Control", label: "Display Output Control" },
    { value: "Firewire Control", label: "Firewire Control" },
    { value: "Infrared Control", label: "Infrared Control" },
    { value: "Thunderbolt Control", label: "Thunderbolt Control" },
    { value: "Ethernet Port Control", label: "Ethernet Port Control" },
    { value: "Remote Device Management", label: "Remote Device Management Control" }
];

export const networkArchitectureOptions = [
    { value: "Zero Trust", label: "Zero Trust" },
    { value: "Traditional", label: "Traditional Network Architecture" },
    { value: "SDN", label: "Software-Defined Networking (SDN)" },
    { value: "Microsegmentation", label: "Microsegmentation" },
    { value: "Cloud-Native Network Architecture", label: "Cloud-Native Network Architecture" },
    { value: "Edge Computing Architecture", label: "Edge Computing Architecture" },
    { value: "Container Network Architecture", label: "Container Network Architecture" },
    { value: "SD-WAN", label: "Software-Defined Wide Area Networking (SD-WAN)" },
    { value: "Multi-Cloud Architecture", label: "Multi-Cloud Architecture" },
    { value: "Hybrid Network Architecture", label: "Hybrid Network Architecture" },
    { value: "Decentralized Network", label: "Decentralized Network" },
    { value: "Fog Computing Architecture", label: "Fog Computing Architecture" },
    { value: "SASE", label: "Secure Access Service Edge (SASE)" },
    { value: "Container Orchestration Network", label: "Container Orchestration Network" },
    { value: "Legacy Network Architecture", label: "Legacy Network Architecture" },
    { value: "Converged Network", label: "Converged Network" },
    { value: "Homogeneous Network Architecture", label: "Homogeneous Network Architecture" },
    { value: "Heterogeneous Network Architecture", label: "Heterogeneous Network Architecture" },
    { value: "SDP", label: "Software-Defined Perimeter (SDP)" },
    { value: "Blockchain Network", label: "Blockchain Network Architecture" },
    { value: "IoT Network Architecture", label: "Internet of Things (IoT) Network Architecture" },
    { value: "5G Network Architecture", label: "5G Network Architecture" }
];

