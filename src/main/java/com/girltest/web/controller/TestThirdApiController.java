package com.girltest.web.controller;

import com.common.util.SystemHWUtil;
import com.io.hw.json.HWJacksonUtils;
import com.string.widget.util.ValueWidget;
import com.string.widget.util.XSSUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by 黄威 on 4/8/16.<br >
 */
@Controller
@RequestMapping("/testapi")
public class TestThirdApiController {

    @RequestMapping(value = "/testapi"/*, produces = SystemHWUtil.RESPONSE_CONTENTTYPE_JSON_UTF*/)
    @ResponseBody
    public String test(String apiPath, String requestMethod) throws IOException {
        apiPath = XSSUtil.deleteXSS(apiPath);
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
        System.out.println("responseStatusCode:" + responseStatusCode);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("responseCode", responseStatusCode);
        map.put("apiPath", apiPath);
        return HWJacksonUtils.getJsonP(map);
    }
}
