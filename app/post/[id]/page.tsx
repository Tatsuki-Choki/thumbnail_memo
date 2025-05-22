import Image from "next/image"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { getCategorySlug } from "@/lib/categories"

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

// サンプルデータ
const thumbnails = [
  {
    id: 1,
    title: "買ってよかった！生活を劇的に変えたアイテム10選【ベストバイ】",
    image: "/images/best-buy-items.png",
    category: "チャレンジ・やってみた",
    content:
      "生活を劇的に変えるアイテムを紹介します。今回は特に便利だったものや、コスパが良かったものを中心に10個ピックアップしました。日常生活が快適になるアイテムばかりなので、ぜひチェックしてみてください。\n\n1. 折りたたみ式ワイヤレスキーボード\n2. ノイズキャンセリングイヤホン\n3. 多機能モバイルバッテリー\n4. スマート家電リモコン\n5. 超軽量折りたたみ傘\n6. 防水スマホケース\n7. 多機能調理器\n8. 姿勢矯正クッション\n9. 高速充電ケーブル\n10. 収納上手になれるオーガナイザー",
    date: "2024-05-01",
    views: "45.2万",
  },
  {
    id: 2,
    title: "【山田五郎×中田】機械式時計はアート。対談2時間SP",
    image: "/images/watch-discussion.png",
    category: "レビュー・紹介・解説",
    content:
      "山田五郎さんと中田さんによる対談。機械式時計の魅力やアートとしての価値について深く掘り下げています。時計好きはもちろん、アートや文化に興味がある方にもおすすめの内容です。\n\n対談では、機械式時計の歴史から始まり、現代における価値、コレクションとしての魅力、投資としての側面まで幅広く議論されています。特に印象的だったのは、「時計は単なる時間を知るための道具ではなく、職人の技術と情熱が詰まった芸術品である」という視点です。",
    date: "2024-04-28",
    views: "32.8万",
  },
  {
    id: 3,
    title: "【#ガッチェ主相談#】VTuberのお悩み相談【やんしき/ガッチェマン】",
    image: "/images/vtuber-consultation.png",
    category: "Vtuber",
    content:
      "VTuberの活動に関するお悩み相談コーナー。個人での活動や企業との関わり方など、実践的なアドバイスが満載です。これからVTuber活動を始めたい方や、すでに活動している方の参考になる内容です。\n\n今回の相談内容：\n・初心者VTuberがフォロワーを増やすためのコツ\n・企業案件の受け方と注意点\n・炎上を防ぐためのSNS運用方法\n・長期的に活動を続けるためのモチベーション管理\n・収益化までの道のりと現実的な目標設定",
    date: "2024-05-10",
    views: "18.5万",
  },
  {
    id: 4,
    title: "【食前】大手病で悩む友人と安かるんの決定的な違いをブログ仕事！",
    image: "/images/business-discussion.png",
    category: "ビジネス・教養",
    content:
      "大企業志向と起業家精神の違いについて考察する内容。キャリア選択や働き方について悩んでいる方におすすめです。実体験に基づいた話が多く、リアルな視点で語られています。\n\n大手企業に勤める友人との対話を通じて見えてきた「大手病」の特徴と、フリーランスとして活動する「安かるん」の働き方の違いを比較。安定を求める考え方と自由を求める考え方、それぞれのメリット・デメリットを包み隠さず議論しています。",
    date: "2024-05-05",
    views: "22.3万",
  },
  {
    id: 5,
    title: "Climax Jump – AAA DEN-O form // covered by 神崎・白鳥・安芸・初瀬川",
    image: "/images/music-cover.png",
    category: "音楽・ミュージック",
    content:
      "人気アニメソング「Climax Jump」のカバー動画。神崎さん、白鳥さん、安芸さん、初瀬川さんによる素晴らしいパフォーマンスをお楽しみください。原曲の魅力を残しつつも、独自のアレンジが光る一曲です。\n\n4人それぞれの個性が光るボーカルと、細部までこだわった楽器演奏が見どころ。特に神崎さんのハイトーンボイスと初瀬川さんのベースラインは必聴です。MVの撮影にも力が入っており、原作へのオマージュが随所に散りばめられています。",
    date: "2024-04-15",
    views: "56.7万",
  },
  {
    id: 6,
    title: "絵画「ダリ・ファンド」トゥ　ダリ予告編（ロングver.）",
    image: "/images/dali-exhibition.png",
    category: "カルチャー・芸術",
    content:
      "サルバドール・ダリの作品と人生に迫るドキュメンタリーの予告編。シュルレアリスムの巨匠の知られざる一面や、作品に込められた意味について詳しく解説しています。芸術ファン必見の内容です。\n\n9月1日から開催される「ダリ・ファンド」展の見どころを紹介。ダリの代表作はもちろん、あまり知られていない初期作品や晩年の作品まで幅広く展示されます。また、ダリの私生活や創作の秘密に迫るインタビュー映像も公開予定です。",
    date: "2024-05-12",
    views: "12.9万",
  },
  {
    id: 7,
    title: "【apex/生配信】みんなで一緒にダイヤの空気よ～",
    image: "/images/apex-gameplay.png",
    category: "ゲーム・実況",
    content:
      "人気バトルロイヤルゲーム「Apex Legends」のランクマッチ実況。ダイヤモンドランクの激しい戦いをお楽しみください。戦略や立ち回りのコツも紹介しているので、上達したい方にもおすすめです。\n\n今シーズンのメタ武器や最新のキャラクターバランスについても詳しく解説。特に注目は新マップでの効果的な立ち回り方と、チームコミュニケーションの重要性について。視聴者参加型の企画も予定しているので、コメント欄もお見逃しなく！",
    date: "2024-05-15",
    views: "34.1万",
  },
  {
    id: 8,
    title: "【戸田恵梨香】「ASK ME ANYTHING」ELLE Japan",
    image: "/images/elle-interview.png",
    category: "エンタメ・バラエティ",
    content:
      "ELLE Japanの人気企画「ASK ME ANYTHING」のインタビュー。プライベートな恋愛観や音楽の趣味など、普段あまり語られない話題について率直に答えています。ファン必見の内容です。\n\n質問コーナーでは、「朝のルーティン」「お気に入りの本」「ストレス解消法」「理想の休日の過ごし方」など、日常生活に関する質問から、「演技で大切にしていること」「今後挑戦したい役柄」といった仕事に関する質問まで幅広く回答。素顔の魅力が伝わる内容になっています。",
    date: "2024-04-30",
    views: "28.6万",
  },
  {
    id: 9,
    title: "【COD:MW3】視聴へのかいまっチャ！w/あらたか、ふらんしすこ、ぎゃんしー【ホロライブ】",
    image: "/images/cod-gameplay.png",
    category: "ゲーム・実況",
    content:
      "「Call of Duty: Modern Warfare 3」のマルチプレイヤーモードを実況プレイ。あらたかさん、ふらんしすこさん、ぎゃんしーさんとのコラボレーションで、笑いあり緊張ありの楽しい内容になっています。\n\n4人チームでの連携プレイが見どころ。それぞれ得意なプレイスタイルを活かしながら、勝利を目指します。途中、予想外の展開や珍プレイも続出し、視聴者を飽きさせません。チャット欄での視聴者とのやり取りも楽しいポイントです。",
    date: "2024-05-08",
    views: "41.3万",
  },
  {
    id: 10,
    title: "【横浜行ったら】横浜中華街を歩いて横浜を眺めたいと思高の映像をひたすら流してみました",
    image: "/images/yokohama-tour.png",
    category: "旅行・観光",
    content:
      "横浜中華街や横浜の街並みを堪能できる映像集。観光スポットや地元の人しか知らない穴場スポットも紹介しています。横浜旅行を計画している方や、バーチャル旅行を楽しみたい方におすすめです。\n\n中華街のグルメスポットや、みなとみらいの夜景、山下公園の散策コースなど、横浜の魅力を余すところなく紹介。BGMには横浜をテーマにした楽曲を使用し、没入感を高めています。コメント欄では視聴者からの横浜おすすめスポット情報も募集中！",
    date: "2024-05-03",
    views: "15.7万",
  },
  {
    id: 11,
    title: "【優勝なるか？】総勢200名超えの大型トーナメント参戦！",
    image: "/images/tournament.png",
    category: "ゲーム・実況",
    content:
      "200名以上が参加する大規模ゲームトーナメントの様子。熱い戦いの数々や、参加者たちの奮闘ぶりをお届けします。トーナメント形式の緊張感あふれる展開をお楽しみください。\n\n予選から決勝までの全過程を収録。強豪プレイヤーとの対戦や、意外な伏兵の活躍など、トーナメントならではの熱い展開が目白押し。解説付きなので、ゲームに詳しくない方も楽しめる内容になっています。果たして優勝は手に入るのか？最後まで目が離せません！",
    date: "2024-04-25",
    views: "38.9万",
  },
  {
    id: 12,
    title: "【ドラクエ6】「バーバラ入り」で大魔王ミルドラースに挑戦！！",
    image: "/images/dragon-quest.png",
    category: "ゲーム・実況",
    content:
      "「ドラゴンクエスト6」のラスボス・ミルドラース戦に挑む実況プレイ。バーバラを入れたパーティ編成で、どのような戦略で挑むのか注目です。懐かしのSFC版ドラクエを楽しみたい方におすすめの内容です。\n\nバーバラを活かすための装備構成や、効果的な呪文・特技の使い方を詳しく解説。ミルドラース戦の攻略法だけでなく、ここに至るまでのレベル上げのコツや、効率的なアイテム集めの方法も紹介しています。ドラクエ6ファン必見の内容です！",
    date: "2024-05-11",
    views: "27.4万",
  },
  {
    id: 13,
    title: "【料理】プロが教える本格パスタ3種の作り方【イタリアン】",
    image: "/images/pasta-cooking.png",
    category: "料理・グルメ",
    content:
      "プロのシェフが教える本格イタリアンパスタのレシピ3種。カルボナーラ、ボロネーゼ、ペペロンチーノの基本から応用までを丁寧に解説します。家庭でも再現できるコツが満載です。\n\n各パスタに合う最適な麺の種類や、アルデンテに茹でるための正確な時間、ソースと麺を絡める黄金比率など、プロならではのテクニックを惜しみなく公開。特に「乳化」の技術は必見です。材料リストと詳細なレシピは概要欄に記載していますので、ぜひチャレンジしてみてください！",
    date: "2024-05-14",
    views: "31.2万",
  },
  {
    id: 14,
    title: "【DIY】100均アイテムだけで作る！おしゃれな収納棚の作り方",
    image: "/images/diy-shelf.png",
    category: "デザイン・ものづくり",
    content:
      "100円ショップの材料だけを使って、おしゃれで実用的な収納棚を作る方法を紹介します。特別な工具がなくても簡単に作れるので、DIY初心者の方にもおすすめです。\n\n必要な材料は全て100均で揃えられるものばかり。木製フレーム、結束バンド、装飾テープなど、意外なアイテムの組み合わせで驚くほどおしゃれな棚が完成します。作業時間は約30分〜1時間程度。完成した棚は、キッチン、洗面所、デスク周りなど様々な場所で活躍します。",
    date: "2024-05-07",
    views: "19.8万",
  },
  {
    id: 15,
    title: "【初心者向け】Webデザインの基本とよくある失敗例",
    image: "/images/web-design.png",
    category: "Web・IT・テクノロジー",
    content:
      "Webデザインを始めたい方向けに、基本的な考え方とよくある失敗例を解説します。デザインの原則から実践的なテクニックまで、幅広く紹介しています。\n\n色彩理論、タイポグラフィ、レイアウトの基本など、デザインの基礎知識を分かりやすく解説。また、初心者がやりがちな「情報過多」「コントラスト不足」「一貫性のなさ」などの失敗例とその改善方法も具体的に紹介しています。最後には、おすすめの学習リソースや練習方法についても触れています。",
    date: "2024-05-09",
    views: "24.5万",
  },
]

export default function PostPage({ params }: { params: { id: string } }) {
  const postId = Number.parseInt(params.id)
  const post = thumbnails.find((t) => t.id === postId) || thumbnails[0]

  // 関連記事（同じカテゴリーの他の記事）
  const relatedPosts = thumbnails.filter((t) => t.category === post.category && t.id !== post.id).slice(0, 3)

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-2">
            <Link href="/" className="text-red-600 hover:underline text-sm">
              ホーム
            </Link>{" "}
            &gt;{" "}
            <Link href={`/category/${getCategorySlug(post.category)}`} className="text-red-600 hover:underline text-sm">
              {post.category}
            </Link>
          </div>

          <article className="mb-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>
            <div className="text-sm text-gray-500 mb-6 flex items-center justify-between">
              <span>{formatDate(post.date)}</span>
            </div>

            <div className="relative aspect-video mb-6 overflow-hidden rounded-lg">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>

            <div className="prose max-w-none">
              <p>{post.content}</p>
              <p>
                これは詳細ページのサンプルコンテンツです。実際のウェブサイトでは、ここに記事の本文や動画などのコンテンツが表示されます。
                サムメモでは、様々なカテゴリのコンテンツを提供しています。気になるカテゴリやサムネイルをクリックして、
                コンテンツをお楽しみください。
              </p>
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4">関連コンテンツ</h2>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/post/${related.id}`}
                    className="group mb-4 break-inside-avoid"
                  >
                    <div className="overflow-hidden rounded-lg border border-gray-200 transition-all group-hover:shadow-md">
                      <div className="relative">
                        <Image
                          src={related.image || "/placeholder.svg"}
                          alt={related.title}
                          width={600}
                          height={400}
                          className="w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium line-clamp-2">{related.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

