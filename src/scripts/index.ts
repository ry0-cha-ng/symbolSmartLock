import {
  Account,
  Address,
  Deadline,
  Mosaic,
  MosaicId,
  PlainMessage,
  RepositoryFactoryHttp,
  TransferTransaction,
  UInt64,
} from "symbol-sdk";

const sendTransaction = async () => {
  const nodeUrl = 'https://symbol-test.next-web-technology.com:3001';
  const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
  const networkType = await repositoryFactory.getNetworkType().toPromise();
  const epochAdjustment = await repositoryFactory.getEpochAdjustment().toPromise();
  const deadline = Deadline.create(epochAdjustment);
  const mosaicIdHex = '7cdf3b117a3c40cc';
  const mosaicId = new MosaicId(mosaicIdHex);
  const rawAddress = 'TAD4H5-3YBHPJ-7XKBD6-RVXSFL-WBVNOA-PVF7PH-7IY'; // 受取側のSymbolアドレス
  const recipientAddress = Address.createFromRawAddress(rawAddress);
  
  // トランザクションの作成
  const transferTransaction = TransferTransaction.create(
    deadline, // トランザクションの有効期限
    recipientAddress, // 受取側アドレス
    [new Mosaic(mosaicId, UInt64.fromUint(1000000))], // 送信するモザイクと金額（今回は10XYM）
    PlainMessage.create('Hello, SESAME'), // トランザクションに添えるメッセージ
    networkType, // Mainnet or Testnet
    UInt64.fromUint(2000000), // 最大手数料率
  );

  const networkGenerationHash = await repositoryFactory.getGenerationHash().toPromise();
  const signerPrivateKey = '1D6657B22BD675456AC1D7304B02724C4930D752B8183EA130C5833E82395846'; // 送信側の秘密鍵
  const signerAccount = Account.createFromPrivateKey(signerPrivateKey, networkType);

  // トランザクションに署名する
  const signedTransaction = signerAccount.sign(transferTransaction, networkGenerationHash);

  // 署名したトランザクションをネットワークにアナウンスする
  const transactionHttp = repositoryFactory.createTransactionRepository();
  return await transactionHttp.announce(signedTransaction).toPromise();
}

sendTransaction();



