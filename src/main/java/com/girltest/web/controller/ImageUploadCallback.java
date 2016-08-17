package com.girltest.web.controller;

import com.common.util.SystemHWUtil;
import com.io.hw.json.HWJacksonUtils;
import oa.util.HWUtils;
import oa.web.upload.UploadCallback;
import org.apache.log4j.Logger;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.util.Map;


public class ImageUploadCallback implements UploadCallback {
    protected static Logger logger = Logger.getLogger(ImageUploadCallback.class);



    @Override
    public String callback(Model model, MultipartFile file, HttpServletRequest request, HttpServletResponse response)
            throws ParseException, IOException {
        String deleteOldFileSt = request.getParameter("deleteOldFile");
        String sameFileNameSt = request.getParameter("sameFileName");
        boolean deleteOldFile = SystemHWUtil.parse33(deleteOldFileSt);
        boolean sameFileName = SystemHWUtil.parse33(sameFileNameSt);
        if (deleteOldFile) {
            System.out.println("上传时删除原文件");
        }

        Map map = HWUtils.getUploadResultMap(file, request, sameFileName, deleteOldFile);
        model.addAllAttributes(map);
        String content = HWJacksonUtils.getJsonP(map);
        logger.info(content);
         /*response.setCharacterEncoding(SystemHWUtil.CHARSET_UTF);//必不可少,要不然中文乱码
		 PrintWriter writer=response.getWriter();
		 writer.write(content);
		 writer.close();*/
        return "public/upload_success";
    }

}
