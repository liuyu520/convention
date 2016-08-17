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
import java.io.PrintWriter;
import java.text.ParseException;
import java.util.Map;


public class AjaxImageUploadCallback implements UploadCallback {
    protected static Logger logger = Logger.getLogger(AjaxImageUploadCallback.class);


    @Override
    public String callback(Model model, MultipartFile file, HttpServletRequest request, HttpServletResponse response)
            throws ParseException, IOException {
        Map map = HWUtils.getUploadResultMap(file, request, false, false);
        model.addAllAttributes(map);
        String content = HWJacksonUtils.getJsonP(map);
        response.setCharacterEncoding(SystemHWUtil.CHARSET_UTF);
        response.setContentType(SystemHWUtil.RESPONSE_CONTENTTYPE_JSON_UTF);
        PrintWriter out = response.getWriter();
        out.print(content);
        out.flush();
        logger.info(content);
         /*response.setCharacterEncoding(SystemHWUtil.CHARSET_UTF);//必不可少,要不然中文乱码
         PrintWriter writer=response.getWriter();
		 writer.write(content);
		 writer.close();*/
        return null;
    }

}
