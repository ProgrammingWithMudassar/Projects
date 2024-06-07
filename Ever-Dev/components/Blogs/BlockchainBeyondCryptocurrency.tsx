import React from 'react'
import BlogWrapper from '../Shared/BlogWrapper'
import { FiInstagram } from 'react-icons/fi'
import { FaTwitter } from 'react-icons/fa'
import Image from 'next/image'
import List from '../Shared/List'

const BlockchainBeyondCryptocurrency = () => {
    return (
        <BlogWrapper id="BlockchainBeyondCryptocurrency" style="py-8" >
            <p className="font-primary text-[18px] text-black-off/60" >
                September 06, 2023
            </p>
            <h1 className="font-primary font-bold text-[38px] leading-[40px] mt-2" >
                Blockchain Beyond Cryptocurrency Real-world Applications
            </h1>
            <div className="w-full flex justify-between items-center mt-2" >
                <p className="font-primary text-[18px] text-brand-tertiary" >
                    By EverDev
                </p>
                <div className="flex justify-center items-center gap-2" >
                    <a href="https://www.instagram.com/everdev.co/" target="_blank" className="w-[36px] h-[36px] rounded-full overflow-hidden flex justify-center items-center bg-[#1D1D1D]" >
                        <FiInstagram className="text-white text-[18px]" />
                    </a>
                    <a href="https://twitter.com/EverDevdotco" target="_blank" className="w-[36px] h-[36px] rounded-full overflow-hidden flex justify-center items-center bg-[#1D1D1D]" >
                        <FaTwitter className="text-white text-[18px]" />
                    </a>
                </div>
            </div>
            <div className="w-full lg:h-[540px] md:h-[400px] sm:h-[300px] h-[200px] relative mt-6" >
                <Image alt="" src={"/blogs/blockchain.png"} sizes="" fill className="object-fill" />
            </div>
            <h2 className="font-primary font-semibold text-[30px] leading-[36px] mt-10" >
                Introduction
            </h2>
            <p className="font-primary text-[17px] text-black-off mt-1" >
                {`Blockchain, the system that powers cryptocurrencies like Bitcoin and Ethereum, is frequently used to refer to electronic money. Its promise, though, goes well beyond simple financial transactions. Blockchain is a decentralized, open-source, and tamper-proof ledger with many practical uses that have the potential to transform many industries.`}
            </p>
            <h2 className="font-primary font-semibold text-[30px] leading-[36px] mt-6" >
                {`Understanding Blockchain's Core Features:`}
            </h2>
            <p className="font-primary text-[17px] text-black-off my-1" >
                {`Before exploring its uses, it's crucial to comprehend the inherent characteristics of blockchain that make it so adaptable:`}
            </p>
            <List style='mt-4' title={`Decentralization: `} text={`Blockchain functions across several nodes, as opposed to centralized systems, removing a single point of failure.`} />
            <List style='mt-1' title={`Transparency: `} text={`Every member of the network can see every transaction.`} />
            <List style='mt-1' title={`Security: `} text={`Transactions are tamper-proof since they are encrypted and subject to network verification.`} />
            <div className="w-full lg:h-[640px] md:h-[400px] sm:h-[300px] h-[200px] relative mt-6" >
                <Image alt="" src={"/blogs/blockchain2.png"} sizes="" fill className="object-fill" />
            </div>
            <h2 className="font-primary font-semibold text-[30px] leading-[36px] mt-10" >
                Real-world Applications Beyond Cryptocurrency:
            </h2>
            <h3 className="font-primary font-semibold text-[20px] leading-[30px] md:ml-4 ml-2 mt-6" >
                1.	Supply Chain Management:
            </h3>
            <List style='mt-2' title={`Problem: `} text={`It has been difficult and opaque to trace things from their point of origin to their final consumer.`} />
            <List style='mt-1' title={`Blockchain Solution: `} text={`Every transaction or movement of items may be documented using blockchain, creating a transparent, unchangeable record.`} />
            <List style='mt-1' title={`Example: `} text={`Major corporations are already investigating blockchain for improved product traceability, including Walmart and IBM.`} />
            <h3 className="font-primary font-semibold text-[20px] leading-[30px] md:ml-4 ml-2 mt-6" >
                2.	Healthcare:
            </h3>
            <List style='mt-2' title={`Problem: `} text={`Patient data is frequently fragmented, which causes inefficiencies and could result in therapeutic mistakes.`} />
            <List style='mt-1' title={`Blockchain Solution: `} text={`A consolidated, secure, and unchangeable patient health record that is only available to authorized individuals can be created using blockchain.`} />
            <List style='mt-1' title={`Example: `} text={`Health records for patients are stored on the blockchain via Medicalchain for quick, safe access.`} />
            <h3 className="font-primary font-semibold text-[20px] leading-[30px] md:ml-4 ml-2 mt-6" >
                3.	Real Estate:
            </h3>
            <List style='mt-2' title={`Problem: `} text={`Property transactions are frequently time-consuming and need a lot of paperwork and verification.`} />
            <List style='mt-1' title={`Blockchain Solution: `} text={`By enabling transparent, verifiable, and secure title transfers, blockchain can streamline the process.`} />
            <List style='mt-1' title={`Example: `} text={`Blockchain-based international real estate transactions are facilitated by a business called Propy.`} />
            <h3 className="font-primary font-semibold text-[20px] leading-[30px] md:ml-4 ml-2 mt-6" >
                4.	Voting Systems:
            </h3>
            <List style='mt-2' title={`Problem: `} text={`Traditional voting procedures are vulnerable to manipulation and fraud.`} />
            <List style='mt-1' title={`Blockchain Solution: `} text={`Votes may be encrypted and verified in a transparent, tamper-proof way thanks to blockchain technology.`} />
            <List style='mt-1' title={`Example: `} text={`In 2019, a blockchain-based voting system was put to the test in the city of Moscow.`} />
            <h3 className="font-primary font-semibold text-[20px] leading-[30px] md:ml-4 ml-2 mt-6" >
                5.	Intellectual Property and Copyright:
            </h3>
            <List style='mt-2' title={`Problem: `} text={`It can be difficult for innovators and artists to establish ownership and receive just compensation.`} />
            <List style='mt-1' title={`Blockchain Solution: `} text={`Through smart contracts, blockchain can automate royalty payments and give irrefutable proof of ownership.`} />
            <List style='mt-1' title={`Example: `} text={`A startup called Myco leverages blockchain to make sure that when their content is shared, artists get paid directly`} />
            <h2 className="inline-block font-primary font-semibold text-[30px] text-white leading-[36px] mt-12 bg-brand-secondary px-4 py-1 rounded-xl" >
                Conclusion
            </h2>
            <p className="font-primary text-[17px] text-black-off mt-4 mb-6" >
                {`Beyond its original use in cryptocurrencies, blockchain technology has enormous promise. The advantages of a decentralized, open, and safe system are indisputable, and they extend to everything from supply chains to healthcare to voting. We may anticipate many more ground-breaking applications of blockchain in our daily lives as technology develops and acceptance increases.`}
            </p>
            <div className="flex justify-center items-center flex-col" >
                <h2 className="font-primary font-normal text-[22px] leading-[36px] mt-6 mb-2" >
                    Follow us for more
                </h2>
                <div className="flex justify-center items-center gap-2" >
                    <a href="https://www.instagram.com/everdev.co/" target="_blank" className="w-[24px] h-[24px] rounded-full overflow-hidden flex justify-center items-center bg-[#1D1D1D]" >
                        <FiInstagram className="text-white text-[14px]" />
                    </a>
                    <a href="https://twitter.com/EverDevdotco" target="_blank" className="w-[24px] h-[24px] rounded-full overflow-hidden flex justify-center items-center bg-[#1D1D1D]" >
                        <FaTwitter className="text-white text-[14px]" />
                    </a>
                </div>
            </div>
        </BlogWrapper>
    )
}

export default BlockchainBeyondCryptocurrency