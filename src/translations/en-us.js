if (!window.Translations) window.Translations = {};

window.Translations['en-us'] = {

  // common
  PREV_PAGE: 'Prev',
  NEXT_PAGE: 'Next',

  TOTAL: 'Total',
  HEIGHT: 'Height',
  DATE: 'Date',
  PRODUCER: 'Producer',
  TRANSACTIONS: 'Transaction',
  AMOUNTS: 'Amounts',
  FEES: 'Fees',
  REWARDS: 'Rewards',
  TYPE: 'Type',
  SENDER: 'Sender',
  RECIPIENT: 'Recipient',
  SECOND_PASSWORD: 'Second Secret',

  // transaction type filter
  TRS_TYPE_TRANSFER: 'Transfer',
  TRS_TYPE_SECOND_PASSWORD: 'Second Secret',
  TRS_TYPE_DELEGATE: 'Delegate',
  TRS_TYPE_VOTE: 'Vote',
  TRS_TYPE_MULTISIGNATURE: 'Multisignature',
  TRS_TYPE_DAPP: 'DApp Register',
  TRS_TYPE_DEPOSIT: 'DApp Deposit',
  TRS_TYPE_WITHDRAWAL: 'DApp withdrawal',

  // application
  DAPP_ICON: 'Icon',
  DAPP_NAME: 'Name',
  DAPP_DESCRIPTION: 'Description',
  DAPP_CATEGORY: 'Category',
  DAPP_SOURCE_CODE: 'Source Code',
  DAPP_DOWNLOAD: 'Download',
  DAPP_LIST: 'Applications',
  DAPP_INSTALL_LIST: 'Installed',

  // dapp category filter
  DAPP_CATEGORY_COMMON: 'Common',
  DAPP_CATEGORY_BUSINESS: 'Business',
  DAPP_CATEGORY_SOCIAL: 'Social',
  DAPP_CATEGORY_EDUCATION: 'Education',
  DAPP_CATEGORY_ENTERTAINMENT: 'Entertainment',
  DAPP_CATEGORY_NEWS: 'News',
  DAPP_CATEGORY_LIFE: 'Life',
  DAPP_CATEGORY_UTILITIES: 'Utility',
  DAPP_CATEGORY_GAMES: 'Games',

  // blockchain browser
  LATEST_BLOCK: 'Latest Block',
  INPUT_SEARCH_CONTENT: 'input search content',

  // block forging
  DELEGATE_INFO: 'Delegate Info',
  DELEGATE_REGISTER: 'Register Delegate',
  FORGING_ENABLE: 'enabled',
  FORGING_DISABLE: 'disabled',
  TOTAL_EARNINGS: 'Total rewards',
  RANKING: 'Rank',
  PRODUCTIVITY: 'Productivity',
  APPROVAL: 'Approval',
  PRODUCED_BLOCKS: 'Produced Blocks',

  // header
  HOME: 'Home',
  PERSONAL: 'Personal',
  APPLICATIONS: 'Application',
  FORGING: 'Forging',
  BLOCKS: 'Block',
  VOTE: 'Vote',
  TRANSFER: 'Trnasfer',
  PEERS: 'Peer',

  // home
  BALANCE: 'Balance',
  LATEST_BLOCK_HEIGHT: 'Latest Block Height',
  VERSION_INFO: 'Version Info',
  MY_TRSACTIONS: 'My Transactions',

  // login
  INPUT_PASSWORD: 'input master secret',
  KEEP_SESSION: 'Keep Session',
  LOGIN: 'Login',
  NEW_ACCOUNT: 'New Account',
  STEP: 'Step',
  CREATE_MASTER_PASSWORD: 'Create Secret',
  NEW_PASSWORD: 'New Secret',
  NEW_PWD_TIP_1: '系统为您生成了足够安全的新密码，下一步将会要求您重复输入以确认密码',
  NEXT_STEP: 'Next',
  SAVE_PASSWORD: 'Save',
  CONFIRM_PASSWORD: 'Confirm',
  INPUT_PASSWORD_AGAIN: 'input your secret again',
  NEW_PWD_TIP_2: '请确保您已安全保存主密码，如果您失去您的主密码，您的帐户将永远无法再打开，您将失去您所有的XAS',
  CONFIRM: 'Confirm',
  CANCEL: 'Cancel',

  // transfer/pay
  SEND: 'Send',
  PAY_TIP: '请确保您正在发送XAS给正确的地址，本操作无法撤消',

  // peers
  PEER_LIST: 'Peer List',
  OPERATING_SYSTEM: 'OS',
  VERSION: 'Version',

  // personal
  ACCOUNT_INFO: 'Account Info',
  QUIT: 'Quit',
  BASIC_INFO: 'Basic Info',
  ADDRESS: 'Address',
  PUBLIC_KEY: 'Public Key',
  ALREADY_SET_TPI: 'Second secret already set',
  SET_SECOND_PASSWORD: 'Set Second Secret',
  PASSWORD_RULE_TIP: '输入8到16位数字和字母组合',
  INPUT_AGAIN: 'input again',
  PASSWORD: 'Secret',
  SUBMIT_SECOND_PASSWORD_TIP: '请确定您已经安全保存了二级密码，一旦丢失，您在Asch系统中的财产将无法找回，设置二级密码需要5XAS手续费',
  SUBMIT: 'Submit',
  ALREADY_SET: '已设置',
  NOT_SET: '未设置',

  // vote
  DELETE: 'Delete',
  DELEGATE_LIST: 'Delegates',
  VOTE_RECORD: 'Votes',
  MY_VOTERS: 'My Voters',
  DELEGATE: 'Delegate',
  PRODUCED_NUMBER: 'Produced Blocks',
  USERNAME: 'Username',
  WEIGHT: 'Weight',
  TOTAL_PEOPLES: '共{{count}}人',

  // model - account detail
  ACCOUNT_DETAIL: 'Account Detail',

  // model - delegate register
  REGISTER_DELEGATE: '注册为受托人',
  DELEGATE_NAME: 'Delegate Name',
  INPUT_DELEGATE_NAME: 'input delegate name',
  DELEGATE_NAME_RULE_TIP: '至少8为数字和字母组合',
  REGISTER: 'Register',
  NEED_PAY: 'need to pay',

  // model - block detail
  BLOCK_DETAIL: 'Block Detail',
  TIME: 'Time',
  PREVIOUS_BLOCK: 'Prev',
  TRANSACTIONS_COUNT: 'Transactions',
  TOTAL_AMOUNTS: 'Total Amounts',
  PAYLOAD_HASH: 'Payload Hash',
  PRODUCER_PUBKEY: 'Producer Pubkey',

  // model - transaction detail/dealinfo
  TRANSACTION_INFO: 'Transaction Info',
  CONFIRMATIONS: 'Confirmations',

  // model - delete vote
  DELETE_VOTE_TITLE: '取消给受托人的投票',
  DELETE_VOTE_TIP: '每次可最多同时删除对33人的投票',

  // model - vote
  VOTE_TITLE: '投票给受托人',
  VOTE_TIP: '请确认您的选择与投票，每张票最多可以同时投33人',
};