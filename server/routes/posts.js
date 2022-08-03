const {Router} = require('express');
const {Post} = require("./../models");
const asyncHandler = require("./../utils/async-handler");
const {User} = require("./../models/");


const router = Router();

// router.get('/', (req,res,next)=>{
//   if(req.query.write){
//     res.json({
//       result:"success"
//     });
//     return;
//   }
//   nexr("error");
// })

router.get('/', async (req, res, next) => {
  // const posts = await Post.find({}).populate("author");

  if(req.query.page < 1){
    next("Please enter a number greater than 1");
    return;
  }
  const page = Number(req.query.page || 1); //default value:1
  const perPage = Number(req.query.perPage || 8);

  const total = await Post.countDocuments({});
  
  

  const posts = await Post.find({})
    .sort({createdAt: -1}) //마지막 작성된 게시글을 첫번째로 가져옴
    .skip(perPage * (page - 1)) // e.g. 1페이지라면 0번부터
    .limit(perPage) // 6개씩 가져와줘.
    .populate("author"); // 사용자정보도 같이

  const totalPage = Math.ceil(total / perPage);
  
  res.json({posts, totalPage});
}); 


router.post('/insert', async (req, res, next) => {
  const { img, title, content, email } = req.body;
  console.log(title, content, email)
  try {

    const authData = await User.findOne({email});

    await Post.create({
      img,
      title,
      content,
      author:authData
    });

    res.json({
      result: '저장이 완료되었습니다'
    });

  } catch (err) {
    next(err);
  }
});

router.get("/:shortId/delete", async (req, res, next)=>{
  const {shortId} = req.params;
  console.log(`delete: ${shortId}`);

  try{
    await Post.deleteOne({shortId});
    
    res.json({
      result:"삭제완료"
    })
  } catch(e) {
    next(e);
  }
});

router.get("/:shortId/find", async (req, res, next)=>{
  let {shortId} = req.params;
  console.log(`update: ${shortId}`)

  try{
    let data = await Post.findOne({shortId});
    console.log(data);

    res.json(data);
  } catch(e){
    next(e);
  }
});

router.post("/:shortId/update", async(req, res, next)=>{
  let {shortId} = req.params;
  let {title, content} = req.body;

  console.log(shortId, title, content);

  try{
    // ({기준},{바꿀내용})
    await Post.updateOne({shortId}, {
      title,
      content
    });

    res.json({
      result: "수정 완료"
    })
  }catch(e){
    next(e)
  }
})


module.exports = router;

