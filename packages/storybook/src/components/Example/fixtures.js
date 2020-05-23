export const unlockedContents = [
  {
    id:
      "urn:digest:d3288f0d87f58b50c5eeb8979e15fc8ce684a36ae6c360f593cde69159d6743c",
    title: "My Entropy",
    image: "https://via.placeholder.com/150",
    description: "For testing only.",
    tags: ["inception"],
    correlation: [
      "urn:digest:d3288f0d87f58b50c5eeb8979e15fc8ce684a36ae6c360f593cde69159d6743c",
    ],
    type: "Entropy",
    seed: "712645d49e11c871c17ed149a48e0c3cdb24ecebfcf5ef885d1d8c078d4fcc24",
  },
  {
    id:
      "did:key:z6Mkn28V7Mk7TyvS82GH5CByFWgBeTbtUedc3HDvJz4bta5f#z6Mkn28V7Mk7TyvS82GH5CByFWgBeTbtUedc3HDvJz4bta5f",
    type: "Ed25519VerificationKey2018",
    controller: [
      "did:key:z6Mkn28V7Mk7TyvS82GH5CByFWgBeTbtUedc3HDvJz4bta5f#z6Mkn28V7Mk7TyvS82GH5CByFWgBeTbtUedc3HDvJz4bta5f",
    ],
    publicKeyBase58: "8ZsSX7Vg8SRy1XRaPdE8QR8BptL34mPFMGJzUi6ayMJH",
    privateKeyBase58:
      "3GD7Tf1LVyyeFTDGyKN965Uxv4URGpqXf1zatENh8KD4nhhxnpSAHrXFt8gSK7ef1qLtyeQNutW1znAVGhFb7wC5",
    title: "My Signing Key",
    image: "https://via.placeholder.com/150",
    description: "Generated from seed.",
    tags: ["inception"],
    correlation: [
      "urn:digest:d3288f0d87f58b50c5eeb8979e15fc8ce684a36ae6c360f593cde69159d6743c",
    ],
  },
  {
    id:
      "did:key:z6Mkn28V7Mk7TyvS82GH5CByFWgBeTbtUedc3HDvJz4bta5f#z6LSnyFDbNfnxgA9MjPwxubimEn2HeDz82kcTgy5XviPUzMU",
    type: "X25519KeyAgreementKey2019",
    controller: [
      "did:key:z6Mkn28V7Mk7TyvS82GH5CByFWgBeTbtUedc3HDvJz4bta5f#z6LSnyFDbNfnxgA9MjPwxubimEn2HeDz82kcTgy5XviPUzMU",
    ],
    publicKeyBase58: "CJ5454rvsDSQGM2BSG5mSeZYSVgsRRaTaiFQ3U4rmcai",
    privateKeyBase58: "Dw9WeBXLdBPr5wLVkPNAaTeC5vMhouJqngHrsyTNnXjN",
    title: "My Encryption Key",
    image: "https://via.placeholder.com/150",
    description: "Generated from seed.",
    tags: ["inception"],
    correlation: [
      "urn:digest:d3288f0d87f58b50c5eeb8979e15fc8ce684a36ae6c360f593cde69159d6743c",
    ],
  },
];

export const lockedContents = [
  {
    id:
      "urn:digest:d3288f0d87f58b50c5eeb8979e15fc8ce684a36ae6c360f593cde69159d6743c",
    jwe: {
      protected: "eyJlbmMiOiJYQzIwUCJ9",
      recipients: [
        {
          header: {
            kid:
              "did:key:z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws#z6LSpndE8VEdX3kBMMFNnBjvha2ZypXxhBZCfW7qeojX2V6J",
            alg: "ECDH-ES+A256KW",
            epk: {
              kty: "OKP",
              crv: "X25519",
              x: "FgUN-lPYL532zuTV1qdiv39c9fL4MQkCaP0LlzB222o",
            },
            apu: "FgUN-lPYL532zuTV1qdiv39c9fL4MQkCaP0LlzB222o",
            apv:
              "ZGlkOmtleTp6Nk1rZjdGV0hmSkFObTluNGhQTXQzZG10QWNxbmtOdXlKTEhTb3ZTTW5mcTRXd3MjejZMU3BuZEU4VkVkWDNrQk1NRk5uQmp2aGEyWnlwWHhoQlpDZlc3cWVvalgyVjZK",
          },
          encrypted_key:
            "DkGWJZBTgzimoveBnB8NCW9aEDTQfDyy6f4oTMFY6BmlCXhutPznLw",
        },
      ],
      iv: "f7giHN0QzPoBU-5BOmzS3zN0JbIm9vhx",
      ciphertext:
        "oOBUBCm7ybRRNw9iZjUIF8W6EpLz5PxF4I07AcD2SMJbwtCN4cWdh2SM-kmEqGqT55v4wZE6PcLsTeiZ15caRmK8IXwH_yaB2PV13uzZJT_FvepREavJBJd9Fd-sLLur1ffcrgUDcyB_YnoS-sw2JBkrRbxBx0yQ321EjtnpIy2WtwTBvUb4Av0UxZtzI5tP8WFbO1J-FpUhmd7DvwWMvAXOjIaBk69iBbbQ1aHO8BRQ5D-3LNEBdxyePx-wNLwByZMQrD0f27jVAa--h8BuTsvzqWe1-rBhyfc8kykzbCpmqYf7rY8odyCOR0N762DwKgvB4GOTZNaJ8n_dC7tP7f1DIcf5HLk-n7mzX-CHIUez55AnrgIuLsBFdlNNOtIoF6N4gzscq-ZRkOQmsISWe9FNZqNsypc8EV5i4tjQi7ByqniPjgEdgdrW7GtNHYe1KTFFjmivjaiOQMIelorhCGZiJL7lhTv_wr1TsoGG1GQt3k_s_-6LZfvGao3UAvVohu3a",
      tag: "QFTODSot08yIp29ONRuDoA",
    },
  },
  {
    id:
      "did:key:z6Mkn28V7Mk7TyvS82GH5CByFWgBeTbtUedc3HDvJz4bta5f#z6Mkn28V7Mk7TyvS82GH5CByFWgBeTbtUedc3HDvJz4bta5f",
    jwe: {
      protected: "eyJlbmMiOiJYQzIwUCJ9",
      recipients: [
        {
          header: {
            kid:
              "did:key:z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws#z6LSpndE8VEdX3kBMMFNnBjvha2ZypXxhBZCfW7qeojX2V6J",
            alg: "ECDH-ES+A256KW",
            epk: {
              kty: "OKP",
              crv: "X25519",
              x: "6ykSeNz_II136iSrD-myFJ7CuIol9tlrm9FyWGKyS2w",
            },
            apu: "6ykSeNz_II136iSrD-myFJ7CuIol9tlrm9FyWGKyS2w",
            apv:
              "ZGlkOmtleTp6Nk1rZjdGV0hmSkFObTluNGhQTXQzZG10QWNxbmtOdXlKTEhTb3ZTTW5mcTRXd3MjejZMU3BuZEU4VkVkWDNrQk1NRk5uQmp2aGEyWnlwWHhoQlpDZlc3cWVvalgyVjZK",
          },
          encrypted_key:
            "OXYQKiPs4MLjgNtguQ8OpQVN8VRPnaqW_M0mSHUWcBbkz0Z39lOYlw",
        },
      ],
      iv: "PyRRaIRSXort2EJsJoMqbEreiY_pIKeB",
      ciphertext:
        "pT-q9MvpkBzvC9DLr7byBspVvJXgmCQEaB4tFCioiD6HHlAoyNjPDgek8MKulBzOFpRECo5YGKZhC2FWbhmrsL2S4_wmnB2vOjqud5QkbNZDEX4lB1RaKvjpjC_IGspfOCqw_ap9D5xTrkwucJl01i2JmPx878b4JXjcm7icf1mYz3cm-TjBkTo-_eXuWXEANT0z9imGxuUqS4lymFYPIp4S5phEXFTmeXnJxyqPqd6XX1Hu8Hmjvo1kRZSeVRMdCVv0fF8NSW3OLjQzxJVW0MRUs4uNTZOoAJ8M-_JkDi14AB74SUVeZMM6fIQW8VLAPAhkCD73Wlmkih2OBQpjLIJXjJNyXNAmwcjXEpT97rC9v5Bkon9SyDt6TwLPQk3QppggN6tH97datG2WRKcKHs8a_ZjusKsHGfj9MBLfar5xHCZy8db1DeJNJ912ifGu5ZV7F3-5pg5P1IlSJj6eM8EYeJrWWCysBm4vPhsx1jarE09GRpN7e_oI2fiu9z-IlfZB1n8tbuCXDGUvQ9XzlPQbj6PVqZAaxpbAyoLJwFzEAnFCLCKpc_5RMVSt-5CpuH3vPb_hgUmTYS2NQPmnq1m5zEU8n0Q8wlVTVFmOu9UlDp8W2jcZWumf1EBajKR9HezlgHr_T-zJtDw_K-yPx63qDwv0a5m-hpDhimHB707FMJgbLdx_hOL4V1YP8B0b2eIrMYfSTGpT545qNUFr4KewGZpqEmm9ilm0n2rf9_AIXyVxp2Wc3HMIve5YPczE36o3ZNRzgZpnKKXOnl6SYhhrxyRxiHF3zDWd9_guSpyMko5TCs1B3uqmwuVCRKjM_cfsf_8HBCyiMCJzM2b9kod7dYnD8Nv-1mMEPBOd1TG5gs2_u0PimwM9Fg",
      tag: "hmkF8qyhATtA51z_Yds9IA",
    },
  },
  {
    id:
      "did:key:z6Mkn28V7Mk7TyvS82GH5CByFWgBeTbtUedc3HDvJz4bta5f#z6LSnyFDbNfnxgA9MjPwxubimEn2HeDz82kcTgy5XviPUzMU",
    jwe: {
      protected: "eyJlbmMiOiJYQzIwUCJ9",
      recipients: [
        {
          header: {
            kid:
              "did:key:z6Mkf7FWHfJANm9n4hPMt3dmtAcqnkNuyJLHSovSMnfq4Wws#z6LSpndE8VEdX3kBMMFNnBjvha2ZypXxhBZCfW7qeojX2V6J",
            alg: "ECDH-ES+A256KW",
            epk: {
              kty: "OKP",
              crv: "X25519",
              x: "9Pj-5_-MJVVGgGKViDkeCtuIaIhRyzMkq44TqmnQtGs",
            },
            apu: "9Pj-5_-MJVVGgGKViDkeCtuIaIhRyzMkq44TqmnQtGs",
            apv:
              "ZGlkOmtleTp6Nk1rZjdGV0hmSkFObTluNGhQTXQzZG10QWNxbmtOdXlKTEhTb3ZTTW5mcTRXd3MjejZMU3BuZEU4VkVkWDNrQk1NRk5uQmp2aGEyWnlwWHhoQlpDZlc3cWVvalgyVjZK",
          },
          encrypted_key:
            "OKcgBvtLpraB6GMrxj7W3z_zNGF7wkjAN39OoCktoRgDHcDp_DM1hQ",
        },
      ],
      iv: "k6sQp86PHOUzX_WgPLTegu4J8sI7q5ay",
      ciphertext:
        "2Ly2TX8jhBP3kx4UzVx3YO-Klz1gK9XJRIQyQonbwdrkgn67iVDP-0kdG7hO3HprQZdI7y0fi9zyWVJ8XDhnBDos0BZ0iK4wOfnZjqEC1c0AC9LqT_9E0up8nx_1I4TEXsfss10k5gNAJW7bgL6QJj6qgdGu3-R1ojjTgc1mIWEdbEeXfEyDvPM8ZB5lOxELPRhGmkPBRw9qoaQWLwZWwX-BptuNMZ4QytZ0bJldXcRostWhdpLBoDb0x1vSu-Rbqh6rnjIn5872E2-r1EgVFiK5j1okUUdJ8cwOdTOz1jrDyqKfSYPGK1_CAStf7qwX34zmgMg8OfJ1uKB0Te3eiHVwvUXZ2mHqHLiZQpIpTOb0dPubJL5u8z5ZpHVbXhITHpKFdKQyoXpII5tP76_SfQWyYRG2MD4bcMuGtbdlzpHffSPf3yTDVboG_sN8Lf8CN2Q3E8NZD2KVs6cqnIKvmqq4Rub_dqX1mkRtrrvBxGys-fcr5gSQ82apEIrSP-Hjd0vz3e3a5iq0t-HcqtsG9DCYTQJrEPNYJCTLHikKXNRZz_KuwxjlAfxmQn-GJ4IByxfRs7qPwA6lTjXsNV8hFFrWJ5SxqnkrzQ-WHxaEAgv43iC0a72WhvtTL4_r7skm-qn2VwC_Y9Zv3kFTJwhrpfkQwNOdrUoipKQpL2CwG7NroQYxrDEBxoQ_t5o7lzVbLGO1faqYlorGS0hDFqeVDyEEuUxtpa_wDmudioBPtkZxPrDBXp_XeIpqZzixEgjeyoz6zZCTpfcCn4PyL70eb75ewYgaE0_Gy047puuNJPJuIV-gXvuOheo0Mq3ikGBKTA",
      tag: "PSq9qyzsR5PSy8-wr4epxQ",
    },
  },
];
