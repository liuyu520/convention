package com.girltest.web.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.text.html.HTML;

import oa.bean.UploadResult;
import oa.util.HWUtils;
import oa.web.upload.UploadCallback;

import org.apache.log4j.Logger;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import com.common.util.SystemHWUtil;
import com.io.hw.file.util.FileUtils;
import com.io.hw.json.HWJacksonUtils;
import com.string.widget.util.ValueWidget;


public class ImageUploadCallback implements UploadCallback {
    protected static Logger logger = Logger.getLogger(ImageUploadCallback.class);

    public static String getHtmlImgTag(String fullUrl) {
        return "<img style=\"max-width: 99%\" src=\"" + fullUrl + "\" alt=\"\">";
    }

    @Override
    public String callback(Model model, MultipartFile file, HttpServletRequest request, HttpServletResponse response)
            throws ParseException, IOException {
        String fileName = file.getOriginalFilename();// 上传的文件名
        fileName = fileName.replaceAll("[\\s]+", SystemHWUtil.EMPTY);//IE中识别不了有空格的json

        UploadResult uploadResult = HWUtils.getSavedToFile(request, fileName, null);
        File savedFile = uploadResult.getSavedFile();
        File parentFolder = SystemHWUtil.createParentFolder(savedFile);
        FileUtils.makeWritable(parentFolder);//使...可写
        System.out.println("[upload]savedFile:"
                + savedFile.getAbsolutePath());
        // 保存
        try {
            file.transferTo(savedFile);

        } catch (Exception e) {
            e.printStackTrace();
        }
        String url2 = HWUtils.getRelativeUrl(request, uploadResult.getRelativePath(), uploadResult.getFinalFileName());
        String fullUrl = null;//http://localhost:8080/tv_mobile/upload/image/20150329170823_2122015-03-23_01-42-03.jpg
        /***
         * request.getRequestURL():http://localhost:8081/SSLServer/addUser.security<br>
         * request.getServletPath():/addUser.security<br>
         * prefixPath:http://localhost:8080/tv_mobile/
         */
        fullUrl = HWUtils.getFullUrl(request, uploadResult.getRelativePath(), uploadResult.getFinalFileName());
        Map map = new HashMap();

        map.put("fileName", uploadResult.getFinalFileName());
        map.put("remoteAbsolutePath", savedFile.getAbsolutePath());
        map.put("url", url2);
        map.put("fullUrl", fullUrl);
        map.put("relativePath", uploadResult.getRelativePath());
        map.put("imgTab", ValueWidget.escapeHTML(getHtmlImgTag(fullUrl)));
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
