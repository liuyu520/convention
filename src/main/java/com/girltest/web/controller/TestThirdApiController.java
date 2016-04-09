package com.girltest.web.controller;

import com.common.util.SystemHWUtil;
import com.io.hw.json.HWJacksonUtils;
import com.string.widget.util.ValueWidget;
import com.string.widget.util.XSSUtil;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by 黄威 on 4/8/16.<br >
 */
@Controller
@RequestMapping("/testapi")
public class TestThirdApiController {
    protected static Logger logger = Logger.getLogger(TestThirdApiController.class);

    /***
     * 用于测试协作方接口是否可以访问,比如403 表示拒绝访问<br>
     * 注意:若上线,则该接口需要鉴权
     *
     * @param apiPath
     * @param requestMethod
     * @return :<br>
     * {
     * apiPath: "http://i.chanjet.com/user/userAndAppInfo",
     * apiPath url encoded: "http%3A%2F%2Fi.chanjet.com%2Fuser%2FuserAndAppInfo",
     * responseCode: 401
     * }
     * @throws IOException
     */
    @RequestMapping(value = "/testapi", produces = SystemHWUtil.RESPONSE_CONTENTTYPE_JSON_UTF)
    @ResponseBody
    public String test(String apiPath, String requestMethod) throws IOException {
        apiPath = XSSUtil.deleteXSS(apiPath);
        if (ValueWidget.isNullOrEmpty(apiPath)) {
            logger.error("apiPath is null");
            return null;
        }
        URL url = new URL(apiPath);
        URLConnection urlConnection = url.openConnection();
        HttpURLConnection httpUrlConnection = (HttpURLConnection) urlConnection;
        httpUrlConnection.setDoInput(true);
        httpUrlConnection.setUseCaches(false);
        if (!ValueWidget.isNullOrEmpty(requestMethod)) {
            httpUrlConnection.setRequestMethod(requestMethod);
        }
        int responseStatusCode = SystemHWUtil.NEGATIVE_ONE;
        try {
            httpUrlConnection.connect();
            responseStatusCode = httpUrlConnection.getResponseCode();
        } catch (java.net.UnknownHostException ex) {
            ex.printStackTrace();
        }

        httpUrlConnection.disconnect();
        logger.info("responseStatusCode:" + responseStatusCode);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("responseCode", responseStatusCode);
        map.put("apiPath", apiPath);
        map.put("apiPath url encoded", URLEncoder.encode(apiPath, SystemHWUtil.CHARSET_UTF));
        return HWJacksonUtils.getJsonP(map);
    }
}
